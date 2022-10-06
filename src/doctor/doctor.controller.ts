import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { DoctorService } from './doctor.service';

@ApiTags("doctor")
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @ApiParam({
    description: 'Peruvian medical code',
    name: "cmp",
    example: "087756"
  })
  @Get("findByCmp/:cmp")
  async findByCmp(@Param('cmp', ParseIntPipe) cmp: number) {
    return await this.doctorService.findByCmp(cmp);
  }
}
