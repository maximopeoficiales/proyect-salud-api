import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { DoctorService } from './doctor.service';
import { DoctorCmpFilterDto } from './dto/doctor-cmp-filter.dto';

@ApiTags("doctor")
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @ApiParam({
    description: 'Peruvian medical code',
    name: "cmp",
    example: "087756"
  })
  @Get(":cmp")
  async findByCmp(@Param('cmp', ParseIntPipe) cmp: number) {
    return await this.doctorService.findByCmp(cmp);
  }

  @ApiParam({
    description: 'Peruvian medical code',
    name: "cmp",
    example: "087756"
  })
  @Get("detail/:cmp")
  async getDetail(@Param('cmp', ParseIntPipe) cmp: number) {
    return await this.doctorService.getDetail(cmp);
  }

  @Post("search")
  async search(@Body() filterData: DoctorCmpFilterDto) {
    return await this.doctorService.search(filterData);
  }

}
