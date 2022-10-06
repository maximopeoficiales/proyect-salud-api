
import { Injectable, NotFoundException } from '@nestjs/common';

import { ConfigService } from 'src/config/config.service';

import * as  qs from 'qs';
import cheerio from 'cheerio';

import { HttpService } from '@nestjs/axios';
import { DoctorCmp } from './domain/doctor-cmp';
@Injectable()
export class DoctorService {
  private urlCmp: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.urlCmp = this.configService.get<string>('URL_CMP');
  }

  public async findByCmp(cmp: number): Promise<DoctorCmp> {
    var data = qs.stringify({
      'cmp': cmp,
      'Submit': 'Buscar',
      'appaterno': '',
      'apmaterno': '',
      'nombres': ''
    });
    console.log(data);

    const response = await this.httpService.post('https://200.48.13.39/cmp/php/listaxmedico.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).toPromise();

    const $ = cheerio.load(response.data);
    const dataArray = $("table td").toArray();
    const medicoData = dataArray.map(e => (e.children[0] as any).data);
    if (medicoData.length == 0) throw new NotFoundException(`Not exists doctor with cmp '${cmp}'`);
    console.log(medicoData);

    return {
      cmp,
      fatherLastName: medicoData[2],
      motherLastName: medicoData[3],
      names: medicoData[4],
    }
  }
}
