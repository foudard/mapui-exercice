import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './schemas/patient.schema';

@Injectable()
export class PatientsService {
  constructor(@InjectModel(Patient.name) private patientModel: Model<Patient>) {}

  async create(createPatientDto: CreatePatientDto) {
    const newPatient = new this.patientModel(createPatientDto);
    return newPatient.save();
  }

  async findAll() {
    const sort = { lastName: 1, firstName: 1 };
    const patients = await this.patientModel.find({}, { treatments: 0 }, { sort });
    return patients;
  }

  async findOne(patientId: string) {
    return this.patientModel.findById(patientId).populate({
      path: 'treatments',
      populate: {
        path: 'doctor',
        model: 'Doctor'
      }
    });
  }

  async update(patientId: string, updatePatientDto: UpdatePatientDto) {
    return this.patientModel.findByIdAndUpdate(patientId, updatePatientDto, { new: true });
  }

  async remove(patientId: string) {
    return this.patientModel.findByIdAndRemove(patientId);
  }
}
