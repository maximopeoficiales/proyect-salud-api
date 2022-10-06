import { ApiProperty } from "@nestjs/swagger";

export class DoctorCmp {
  @ApiProperty()
  cmp: number;
  @ApiProperty()
  fatherLastName: string;
  @ApiProperty()
  motherLastName: string;
  @ApiProperty()
  names: string;
}