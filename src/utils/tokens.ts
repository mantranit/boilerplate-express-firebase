import { sign } from "jsonwebtoken";
import config from "./config";

export const getAccessToken = (userId: string) => {
  return sign({ userId }, config.jwtAccessKey, { expiresIn: "1d" });
};

export const getRefreshToken = (userId: string) => {
  return sign({ userId }, config.jwtRefreshKey, { expiresIn: "30d" });
};
