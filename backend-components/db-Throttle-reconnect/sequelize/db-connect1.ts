import { Sequelize } from "sequelize";
import { sleep } from "src/util/sleep";
import { logger } from "src/util/logger";
import { OrmConfig } from "src/ormconfig";

// Utility function to handle reconnection logic
async function handleReconnection(sequelize: Sequelize) {
  let isConnected = false;

  while (!isConnected) {
    try {
      await sequelize.authenticate();
      isConnected = true;
      logger.info("Reconnected to DB");
    } catch (error) {
      logger.error(error, "Reconnect Error");
      await sleep(500); // Wait before trying again
    }
  }
}

// Handles unstable/intermittent connection loss to DB
function connectionGuard(sequelize: Sequelize) {
  sequelize.connectionManager.on("error", async (err) => {
    logger.error(err, "Connection pool error, attempting to reconnect...");
    try {
      await sequelize.close();
    } catch (innerErr) {
      logger.error(innerErr, "Failed to close connection");
    }
    await handleReconnection(sequelize);
  });
}

// 1. Wait for DB to come online and connect
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
      isConnected = true;
    } catch (error) {
      logger.error(error, "Initial connection error");
      await sleep(500); // Wait before retrying
    }
  }

  logger.info("Connected to DB");
  connectionGuard(sequelize);
}
