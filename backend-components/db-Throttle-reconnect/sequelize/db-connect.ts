import { Sequelize } from "sequelize";
import { sleep } from "src/util/sleep";
import { logger } from "src/util/logger";
import { OrmConfig } from "src/ormconfig";

// Handles unstable/intermittent connection lost to DB
function connectionGuard(sequelize: Sequelize) {
  // Add handler on pool error event
  sequelize.connectionManager.pool.on("error", async (err) => {
    logger.error(err, "Connection pool erring out, Reconnecting...");
    try {
      await sequelize.close();
    } catch (innerErr) {
      logger.error(innerErr, "Failed to close connection");
    }
    while (!sequelize.connectionManager.isConnected) {
      try {
        await sequelize.authenticate();
        logger.info("Reconnected DB");
      } catch (error) {
        logger.error(error, "Reconnect Error");
      }

      if (!sequelize.connectionManager.isConnected) {
        // Throttle retry
        await sleep(500);
      }
    }
  });
}

// 1. Wait for db to come online and connect
// 2. On connection instability, able to reconnect
// 3. The app should never die due to connection issue
export async function connect() {
  let sequelize: Sequelize;
  let isConnected = false;

  logger.info("Connecting to DB...");
  while (!isConnected) {
    try {
      sequelize = new Sequelize(OrmConfig);
      await sequelize.authenticate();
      isConnected = sequelize.connectionManager.isConnected;
    } catch (error) {
      logger.error(error, "createConnection Error");
    }

    if (!isConnected) {
      // Throttle retry
      await sleep(500);
    }
  }

  logger.info("Connected to DB");
  connectionGuard(sequelize);
}
