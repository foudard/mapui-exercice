import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from '../patients/schemas/patient.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './schemas/doctor.schema';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
    @InjectModel(Patient.name) private patientModel: Model<Patient>
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const newDoctor = new this.doctorModel(createDoctorDto);
    return newDoctor.save();
  }

  async update(doctorId: string, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorModel.findByIdAndUpdate(doctorId, updateDoctorDto, { new: true });
  }

  async findAll() {
    const sort = { lastName: 1, firstName: 1 };
    return this.doctorModel.find({}, {}, { sort });
  }

  async findOne(doctorId: string) {
    return this.doctorModel.findById(doctorId);
  }

  async remove(doctorId: string) {
    return this.doctorModel.findByIdAndRemove(doctorId);
  }

  async findTreatments(doctorId: string) {
    return (
      await this.patientModel.aggregate([
        { $match: { 'treatments.doctor': doctorId } },
        { $project: { _id: 1, firstName: 1, lastName: 1, treatments: 1 } },
        { $unwind: '$treatments' },
        { $match: { 'treatments.doctor': doctorId } },
        { $sort: { 'treatments.start': 1, 'treatments.end': 1 } }
      ])
    ).map((i) => {
      const { treatments, ...patient } = i;
      delete treatments.doctor;
      return { ...treatments, patient };
    });
  }

  async findPatients(doctorId: string) {
    const sort = { lastName: 1, firstName: 1 };
    return this.patientModel.find({ 'treatments.doctor': doctorId }, { treatments: 0 }, { sort });
  }
}
