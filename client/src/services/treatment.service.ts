import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Patient } from '../models/Patients';
import { Treatment } from '../models/Treatment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  baseUrl = `${environment.baseUrl}/patients`;

  constructor(private http: HttpClient) {}

  create(patientId: string, treatment: Treatment) {
    return this.http.post<Patient>(`${this.baseUrl}/${patientId}/treatments`, treatment);
  }

  remove(patientId: string, treatmentId: string) {
    return this.http.delete(`${this.baseUrl}/${patientId}/treatments/${treatmentId}`);
  }
}
