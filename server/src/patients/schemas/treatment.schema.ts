import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Doctor } from '../../doctors/schemas/doctor.schema';

export class Treatment {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  start: number;

  @Prop()
  end: number;

  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop({ type: Types.ObjectId, ref: 'Doctor' })
  doctor: Doctor;
}
