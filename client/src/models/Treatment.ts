import { Doctor } from './Doctors';
import { Patient } from './Patients';

export interface Treatment {
  _id?: string;
  start: number;
  end: number;
  name: string;
  code: string;
  doctor?: string | Doctor;
  patient?: Patient;
}
