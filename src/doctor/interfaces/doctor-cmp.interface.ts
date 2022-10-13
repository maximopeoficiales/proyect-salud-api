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

export class DoctorCmpDetail {

  @ApiProperty()
  cmp: number;

  @ApiProperty()
  lastNames: string;

  @ApiProperty()
  names: string;

  @ApiProperty()
  status: boolean;


  @ApiProperty({
    example: {
      src: "string",
      with: "string",
      height: "string"
    }
  })
  img: Partial<DoctorImage>;

  @ApiProperty()
  email: string;

  @ApiProperty()
  regionalCouncil: string;

  @ApiProperty()
  description: string;

  @ApiProperty(
    {
      isArray: true,
      example: {
        registry: "string",
        type: "string",
        code: "string",
        date: "string",
      }
    }
  )
  certifications: DoctorCertifications[]
}

class DoctorImage {
  @ApiProperty()
  src: string;
  @ApiProperty()
  width: string;
  @ApiProperty()
  height: string;
}
class DoctorCertifications {
  @ApiProperty()
  registry: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  date: string;
}