import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DoctorSchema = HydratedDocument<Doctor>;

@Schema({
  toJSON: {
    transform: (_, obj) => {
      delete obj.__v;
      return obj;
    }
  }
})
export class Doctor {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  speciality: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
