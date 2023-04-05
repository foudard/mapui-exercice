import { IsMongoId } from 'class-validator';

export class GetDoctorDto {
  @IsMongoId()
  doctorId: string;
}
