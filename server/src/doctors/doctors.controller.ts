import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, Patch, NotFoundException } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { GetDoctorDto } from './dto/get-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './schemas/doctor.schema';

export function sendDoctorIfExists(doctor: Doctor) {
  if (doctor) {
    return doctor;
  }

  throw new NotFoundException();
}

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body(new ValidationPipe({ transform: true })) createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Patch(':doctorId')
  async update(@Param() params: GetDoctorDto, @Body() updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.doctorsService.update(params.doctorId, updateDoctorDto);
    return sendDoctorIfExists(doctor);
  }

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':doctorId')
  async findOne(@Param() params: GetDoctorDto) {
    const doctor = await this.doctorsService.findOne(params.doctorId);
    return sendDoctorIfExists(doctor);
  }

  @Delete(':doctorId')
  async remove(@Param() params: GetDoctorDto) {
    const doctor = await this.doctorsService.remove(params.doctorId);
    return sendDoctorIfExists(doctor);
  }

  @Get(':doctorId/treatments')
  async findTreatments(@Param() params: GetDoctorDto) {
    return this.doctorsService.findTreatments(params.doctorId);
  }

  @Get(':doctorId/patients')
  async findPatients(@Param() params: GetDoctorDto) {
    return this.doctorsService.findPatients(params.doctorId);
  }
}
