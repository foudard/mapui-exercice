import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTreatmentDto } from '../dto/create-treatment.dto';
import { Patient } from '../schemas/patient.schema';

@Injectable()
export class TreatmentsService {
  constructor(@InjectModel(Patient.name) private patientModel: Model<Patient>) {}

  async create(patientId: string, createTreatmentDto: CreateTreatmentDto) {
    return this.patientModel.findByIdAndUpdate(
      patientId,
      {
        $push: { treatments: { ...createTreatmentDto, _id: new Types.ObjectId() } }
      },
      { new: true }
    );
  }

  async remove(patientId: string, treatmentId: string) {
    return this.patientModel.findByIdAndUpdate(
      patientId,
      {
        $pull: { treatments: { _id: new Types.ObjectId(treatmentId) } }
      },
      { new: true }
    );
  }
}
