import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import * as  qs from 'qs';
import cheerio from 'cheerio';
import { HttpService } from '@nestjs/axios';

import { DoctorCertifications, DoctorCmp, DoctorCmpDetail } from './domain/doctor-cmp';
import { getDataCheerioByArray } from 'src/shared/cheerio.utils';
import { getText } from 'src/shared/text.utils';
import { ConfigService } from 'src/config/config.service';
@Injectable()
export class DoctorService {
  private urlCMP: string;
  private directionUrl: string;
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.urlCMP = this.config.get('URL_CMP');
    this.directionUrl = "cmp/php";
  }

  public async find(findData: Partial<DoctorCmp>): Promise<DoctorCmp> {

    if (Object.values(findData).length === 0) throw new BadRequestException("Send at least one search parameter");

    const { cmp, fatherLastName, motherLastName, names } = findData;
    const data = qs.stringify({
      'cmp': cmp ?? '',
      'Submit': 'Buscar',
      'appaterno': fatherLastName ?? '',
      'apmaterno': motherLastName ?? '',
      'nombres': names ?? ''
    });

    const response = await this.httpService.post(`${this.directionUrl}/listaxmedico.php`, data).toPromise();

    const $ = cheerio.load(response.data);
    const dataArray = $("table td").toArray();

    const medicoData: string[] = dataArray.map(e => {
      const dataElement = (e.children[0] as any)
      return dataElement ? dataElement.data : "";
    });

    if (medicoData.length == 0) throw new NotFoundException(`There is no doctor with the parameters sought`);


    return {
      cmp: cmp || +getText(medicoData[1]),
      fatherLastName: getText(medicoData[2]),
      motherLastName: getText(medicoData[3]),
      names: getText(medicoData[4]),
    }
  }

  public async getDetail(cmp: number): Promise<DoctorCmpDetail> {

    const response = await this.httpService.get(`${this.directionUrl}/detallexmedico.php`, {
      params: { id: cmp }
    }).toPromise();

    // extract data
    const $ = cheerio.load(response.data);
    const dataArray = $("table td,table center").toArray();
    const certifications: DoctorCertifications[] = [];
    // extraigo las certificaciones en casa vinieran varias
    $("#simple-example-table4 tr").each((i, e) => {
      if (i > 0) {
        const dataCertification = getDataCheerioByArray($(e).children("td").toArray());
        certifications.push({
          registry: getText(dataCertification[0]),
          type: getText(dataCertification[1]),
          code: getText(dataCertification[2]),
          date: getText(dataCertification[3]),
        })
      }
    });
    const dataImageArray = $("table td img").toArray();

    const medicoData = getDataCheerioByArray(dataArray);
    if (medicoData.length == 0) throw new NotFoundException(`There is no doctor with the parameters sought`);

    // const certifications = getDataCheerioByArray(dataCertificationsArray);
    const imageAttribsDoctor = dataImageArray.length > 0 ? dataImageArray[0].attribs : null;
    const imageSrc = getText(imageAttribsDoctor.src).length > 0 ? `${this.urlCMP}/${this.directionUrl}/${imageAttribsDoctor.src}` : "";

    // console.log({ certifications });

    return {
      cmp,
      lastNames: getText(medicoData[3]),
      names: getText(medicoData[4]),
      status: getText(medicoData[5]) === "ACTIVO",
      img: {
        src: imageSrc,
        height: getText(imageAttribsDoctor.height),
        width: getText(imageAttribsDoctor.width),
      },
      email: getText(medicoData[8]),
      regionalCouncil: getText(medicoData[9]),
      description: getText(medicoData[10]),
      certifications,
    }
  }

  public async findByCmp(cmp: number): Promise<DoctorCmp> {
    return await this.find({ cmp });
  }
}
