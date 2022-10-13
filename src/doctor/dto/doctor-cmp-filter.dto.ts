import { ApiProperty, } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min} from "class-validator";

export class DoctorCmpFilterDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  cmp: number;

  @ApiProperty()
  @IsOptional()
  fatherLastName: string;
  @ApiProperty()
  @IsOptional()
  motherLastName: string;
  @ApiProperty()
  @IsOptional()
  names: string;
}