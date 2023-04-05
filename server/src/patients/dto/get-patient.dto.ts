import { IsMongoId } from 'class-validator';

export class GetPatientDto {
  @IsMongoId()
  patientId: string;
}
