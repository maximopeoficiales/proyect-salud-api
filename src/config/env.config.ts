import { ConfigEnv } from "./interfaces/config.interface";

export const EnvConfiguration = (): ConfigEnv => (
  {
    URL_CMP: process.env.URL_CMP,
    ENV: process.env.NODE_ENV || 'dev',
    PORT: +process.env.PORT || 3002,
  }
)