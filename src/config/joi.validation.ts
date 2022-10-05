import * as Joi from "joi";
import { ConfigEnv } from "./interfaces/config.interface";

export const JoiValidationSchema = Joi.object<ConfigEnv>({
  URL_CMP: Joi.string().required(),
  PORT: Joi.number().default(3000),
  ENV: Joi.string().default("dev"),
});