import { Sequelize, Model, DataTypes } from "sequelize";
import cacheMiddleware from "./cacheMiddleware";

// Define your Sequelize instance (update with your database config)
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres",
});

async function getUserById(id: number): Promise<User | null> {
  const cacheKey = `user:${id}`;
  const cachedUser = await cacheMiddleware.get(cacheKey);

  if (cachedUser) {
    console.log("Returning cached data");
    return cachedUser as User;
  }

  console.log("Fetching from database");
  const user = await User.findByPk(id);
  if (user) {
    await cacheMiddleware.set(cacheKey, user);
  }

  return user;
}

// Example usage
(async () => {
  const userId = 1; // Example user ID
  const user = await getUserById(userId);
  console.log(user);
})();
