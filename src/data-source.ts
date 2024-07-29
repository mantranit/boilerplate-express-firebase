import { DataSource } from "typeorm";
import config from "./utils/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  synchronize: config.dbSynchronize,
  logging: config.dbLogging,
  entities: ["src/database/entities/*.ts"],
  subscribers: ["src/database/subscribers/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
});
