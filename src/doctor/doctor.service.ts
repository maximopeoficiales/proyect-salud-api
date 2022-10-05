import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class DoctorService {
  private urlCmp: string;
  constructor(
    private readonly configService: ConfigService
  ) {
    this.urlCmp = this.configService.get<string>('URL_CMP');
  }
  public async findByCmp(cmp: number) {
    return { cmp };
  }
}
