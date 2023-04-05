import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Doctor } from '../models/Doctors';
import { Patient } from '../models/Patients';
import { Treatment } from '../models/Treatment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  baseUrl = `${environment.baseUrl}/doctors`;

  constructor(private http: HttpClient) {}

  fetchDoctors() {
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  getById(doctorId: string) {
    return this.http.get<Doctor>(`${this.baseUrl}/${doctorId}`);
  }

  create(doctor: Doctor) {
    return this.http.post<Doctor>(this.baseUrl, doctor);
  }

  edit(doctorId: string, doctor: Doctor) {
    return this.http.patch<Doctor>(`${this.baseUrl}/${doctorId}`, doctor);
  }

  getTreatments(doctorId: string) {
    return this.http.get<Treatment[]>(`${this.baseUrl}/${doctorId}/treatments`);
  }

  getPatients(doctorId: string) {
    return this.http.get<Patient[]>(`${this.baseUrl}/${doctorId}/patients`);
  }
}
