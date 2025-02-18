import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { TreatmentsController } from './treatments/treatments.controller';
import { TreatmentsService } from './treatments/treatments.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }])],
  controllers: [PatientsController, TreatmentsController],
  providers: [PatientsService, TreatmentsService]
})
export class PatientsModule {}
