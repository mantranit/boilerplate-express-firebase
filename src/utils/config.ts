import dotenv from "dotenv";
dotenv.config();

interface ConfigValues {
  env: string;
  port: number;
}

class Config implements ConfigValues {
  env = process.env.NODE_ENV ?? "development";
  port = parseInt(process.env.PORT || "8000", 10);
}

export default new Config();
