import dotenv from "dotenv";
dotenv.config();

interface ConfigValues {
  env: string;
  port: number;
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbDatabase: string;
  dbSynchronize: boolean;
  dbLogging: boolean;
  jwtAccessKey: string;
  jwtRefreshKey: string;
}

class Config implements ConfigValues {
  env = process.env.NODE_ENV || "development";
  port = parseInt(process.env.PORT || "4000", 10);
  dbHost = process.env.DB_HOST || "localhost";
  dbPort = parseInt(process.env.DB_PORT || "5432", 10);
  dbUsername = process.env.DB_USERNAME || "postgres";
  dbPassword = process.env.DB_PASSWORD || "postgres";
  dbDatabase = process.env.DB_DATABASE || "erp-redesign";
  dbSynchronize = Boolean(process.env.DB_SYNCHRONIZE) || true;
  dbLogging = Boolean(process.env.DB_LOGGING) || true;
  jwtAccessKey = process.env.JWT_ACCESS_KEY || "THIS IS ACCESS KEY";
  jwtRefreshKey = process.env.JWT_REFRESH_KEY || "THIS IS REFRESH KEY";
}

export default new Config();
