import { ConstantsInterface } from "./constants.interface";

export interface DbConstantsInterface extends ConstantsInterface {
  // MongoDB
  mongodbHost: string;
  mongodbPort: number;
  mongodbDb: string;
  mongodbUsername: string;
  mongodbPassword: string;
  mongodbUri: string;
  // Redis
  redisHost: string;
  redisPort: number;
  redisDb: number;
  redisUsername: string;
  redisPassword: string;
  redisUri: string;
}
