import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface ENV {
  BASE_URL: string | undefined;
  CLIENT_URL: string | undefined;
  NODE_ENV: string | undefined;
  MONGODB_CONNECTION_URL: string;
  _URL: string | undefined;
  PORT: Number | undefined;
  JWT_SECRET:string | undefined;
}

const getConfig = (): ENV => {
  return {
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL:process.env.CLIENT_URL,
    _URL:process.env._URL,
    MONGODB_CONNECTION_URL: process.env.MONGODB_CONNECTION_URL
      ? process.env.MONGODB_CONNECTION_URL
      : "",
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    JWT_SECRET: process.env.JWT_SECRET,
  };
};

const config = getConfig();

export default config;