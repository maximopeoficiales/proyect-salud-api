import { Injectable } from '@nestjs/common';
import { ConfigEnv } from './interfaces/config.interface';
import { ConfigService as ConfigNestService } from '@nestjs/config';
@Injectable()
export class ConfigService {
  constructor(
    private readonly configService: ConfigNestService,
  ) {

  }
  get<T = string>(value: keyof ConfigEnv) {
    return this.configService.getOrThrow<T>(value);
  }
}
