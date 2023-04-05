import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Treatment } from './treatment.schema';

export type PatientSchema = HydratedDocument<Patient>;

@Schema({
  toJSON: {
    transform: (_, obj) => {
      delete obj.__v;
      return obj;
    }
  }
})
export class Patient {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  treatments: Treatment[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
