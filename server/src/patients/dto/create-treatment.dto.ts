import { IsInt, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTreatmentDto {
  @IsInt()
  start: number;

  @IsInt()
  end: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsMongoId()
  doctor: Types.ObjectId;
}
