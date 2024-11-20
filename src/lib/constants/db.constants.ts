import { registerAs } from "@nestjs/config";

const mongodbHost = process.env.MONGODB_HOST;
const mongodbPort: number = parseInt(process.env.MONGODB_PORT || "28300");
const mongodbDb = process.env.MONGODB_DB;
const mongodbUsername = process.env.MONGODB_USERNAME;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const redisHost = process.env.REDIS_HOST;
const redisPort: number = parseInt(process.env.REDIS_PORT || "6379");
const redisDb: number = parseInt(process.env.REDIS_DB || "0");
const redisUsername = process.env.REDIS_USERNAME;
const redisPassword = process.env.REDIS_PASSWORD;

export default registerAs("db", () => ({
  // MongoDB
  mongodbHost: mongodbHost,
  mongodbPort: mongodbPort,
  mongodbDb: mongodbDb,
  mongodbUsername: mongodbUsername,
  mongodbPassword: mongodbPassword,
  mongodbUri:
    process.env.MONGODB_URI ||
    `mongodb://${mongodbUsername}:${mongodbPassword}@${mongodbHost}:${mongodbPort}/${mongodbDb}`,
  // Redis
  redisHost: redisHost,
  redisPort: redisPort,
  redisDb: redisDb,
  redisUsername: redisUsername,
  redisPassword: redisPassword,
  redisUri: process.env.REDIS_URI || `redis://${redisUsername}:${redisPassword}@${redisHost}:${redisPort}/${redisDb}`,
}));
