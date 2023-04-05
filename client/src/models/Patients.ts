import { Treatment } from './Treatment';

export interface Patient {
  _id?: string;
  firstName: string;
  lastName: string;
  age: number | undefined;
  gender: string;
  treatments?: Treatment[];
}
