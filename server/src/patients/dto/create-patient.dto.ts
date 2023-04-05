import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

enum Gender {
  MALE = 'M',
  FEMALE = 'W',
  UNKNOWN = ''
}

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsInt()
  @Min(0)
  @Max(150)
  age: number;

  @IsEnum(Gender)
  @IsOptional()
  gender = '';
}
