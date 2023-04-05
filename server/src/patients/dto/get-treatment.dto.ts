import { IsMongoId } from 'class-validator';

export class GetTreatmentDto {
  @IsMongoId()
  patientId: string;

  @IsMongoId()
  treatmentId: string;
}
