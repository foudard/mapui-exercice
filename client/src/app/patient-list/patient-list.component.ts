import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/Patients';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {
  subscriptions: Subscription[] = [];
  patients: Patient[] = [];
  columns = [
    { field: 'Last name', value: (item: Patient) => item.lastName },
    { field: 'First name', value: (item: Patient) => item.firstName },
    { field: 'Age', value: (item: Patient) => item.age },
    {
      field: 'Gender',
      value: (item: Patient) => (item.gender === 'M' ? 'Man' : item.gender === 'W' ? 'Woman' : 'Not specified')
    }
  ];

  constructor(private patientService: PatientService, private router: Router) {
    this.getPatients();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getPatients() {
    const sub = this.patientService.fetchPatients().subscribe((data: Patient[]) => {
      this.patients = data;
    });

    this.subscriptions.push(sub);
  }

  addPatient() {
    this.router.navigate(['/patients/form']);
  }

  editPatient(patient: Patient) {
    this.router.navigate(['/patients/form'], { queryParams: { patientId: patient._id } });
  }

  patientDetails(patient: Patient) {
    this.router.navigate(['/patients/details'], { queryParams: { patientId: patient._id } });
  }

  removePatient(patient: Patient) {
    if (patient._id) {
      const sub = this.patientService.remove(patient._id).subscribe(() => this.getPatients());
      this.subscriptions.push(sub);
    }
  }
}
