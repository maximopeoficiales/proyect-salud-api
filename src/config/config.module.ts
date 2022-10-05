import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as ConfigNest } from '@nestjs/config';
import { EnvConfiguration } from './env.config';
import { JoiValidationSchema } from './joi.validation';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
  imports: [
    ConfigNest.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),
  ]
})
export class ConfigModule { }
