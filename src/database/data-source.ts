import { DataSource, DataSourceOptions } from "typeorm";
import config from "../utils/config";

function getConfig(): DataSourceOptions {
  if (config.env !== "development") {
    return {
      type: "postgres",
      host: config.dbHost,
      port: config.dbPort,
      username: config.dbUsername,
      password: config.dbPassword,
      database: config.dbDatabase,
      synchronize: config.dbSynchronize,
      logging: config.dbLogging,
      entities: [__dirname + "/../**/entities/*.js"],
      subscribers: [__dirname + "/../**/subscribers/*.js"],
      migrations: [__dirname + "/../**/migrations/*.js"],
    };
  }
  return {
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
  };
}

export const AppDataSource = new DataSource(getConfig());
