import { Controller, Post, Body, Param, Delete, ValidationPipe } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from '../dto/create-treatment.dto';
import { GetTreatmentDto } from '../dto/get-treatment.dto';
import { GetPatientDto } from '../dto/get-patient.dto';

@Controller('patients/:patientId/treatments')
export class TreatmentsController {
  constructor(private readonly treatmentService: TreatmentsService) {}

  @Post()
  async create(
    @Param() params: GetPatientDto,
    @Body(new ValidationPipe({ transform: true })) createTreatmentDto: CreateTreatmentDto
  ) {
    return this.treatmentService.create(params.patientId, createTreatmentDto);
  }

  @Delete(':treatmentId')
  async remove(@Param() params: GetTreatmentDto) {
    return this.treatmentService.remove(params.patientId, params.treatmentId);
  }
}
