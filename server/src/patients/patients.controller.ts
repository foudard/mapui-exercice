import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ValidationPipe } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { GetPatientDto } from './dto/get-patient.dto';
import { Patient } from './schemas/patient.schema';

function sendPatientIfExists(patient: Patient) {
  if (patient) {
    return patient;
  }

  throw new NotFoundException();
}

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(@Body(new ValidationPipe({ transform: true })) createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':patientId')
  async findOne(@Param() params: GetPatientDto) {
    const patient = await this.patientsService.findOne(params.patientId);
    return sendPatientIfExists(patient);
  }

  @Patch(':patientId')
  async update(@Param() params: GetPatientDto, @Body() updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientsService.update(params.patientId, updatePatientDto);
    return sendPatientIfExists(patient);
  }

  @Delete(':patientId')
  async remove(@Param() params: GetPatientDto) {
    const patient = await this.patientsService.remove(params.patientId);
    return sendPatientIfExists(patient);
  }
}
