import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/Patients';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = `${environment.baseUrl}/patients`;

  constructor(private http: HttpClient) {}

  fetchPatients() {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  getById(patientId: string) {
    return this.http.get<Patient>(`${this.baseUrl}/${patientId}`);
  }

  create(patient: Patient) {
    return this.http.post<Patient>(this.baseUrl, patient);
  }

  edit(patientId: string, patient: Patient) {
    return this.http.patch<Patient>(`${this.baseUrl}/${patientId}`, patient);
  }

  remove(patientId: string) {
    return this.http.delete(`${this.baseUrl}/${patientId}`);
  }
}
