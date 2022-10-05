import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DoctorService } from './doctor.service';

@ApiTags("doctor")
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Get("findByCmp/:cmp")
  async findByCmp(@Param('cmp', ParseIntPipe) cmp: number) {
    return await this.doctorService.findByCmp(cmp);
  }

}
