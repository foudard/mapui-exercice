import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/Doctors';
import { Patient } from '../../models/Patients';
import { Treatment } from '../../models/Treatment';
import { TableColumn } from '../table/table.component';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent {
  subscriptions: Subscription[] = [];
  doctorId: string | undefined;
  doctor: Doctor | undefined;
  treatments: Treatment[] = [];
  patients: Patient[] = [];

  treatmentsColumns: TableColumn<Treatment>[] = [
    { field: 'Name', value: (item) => item.name },
    { field: 'Start', value: (item) => new Date(item.start).toLocaleDateString() },
    { field: 'End', value: (item) => new Date(item.end).toLocaleDateString() },
    { field: 'Code', value: (item) => item.code },
    {
      field: 'Patient',
      value: (item) => `${item.patient?.firstName} ${item.patient?.lastName}`,
      link: (item) => `/patients/details?patientId=${item.patient?._id}`
    }
  ];

  patientsColumns = [
    { field: 'Last name', value: (item: Patient) => item.lastName },
    { field: 'First name', value: (item: Patient) => item.firstName },
    { field: 'Age', value: (item: Patient) => item.age },
    {
      field: 'Gender',
      value: (item: Patient) => (item.gender === 'M' ? 'Man' : item.gender === 'W' ? 'Woman' : 'Not specified')
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private doctorService: DoctorService) {
    const req = this.route.queryParams.subscribe((params) => {
      this.doctorId = params['doctorId'];
      if (this.doctorId) {
        this.getDoctor();
        this.getDoctorTreatments();
        this.getDoctorPatients();
      } else {
        this.goBack();
      }
    });

    this.subscriptions.push(req);
  }

  getDoctor() {
    if (this.doctorId) {
      const req = this.doctorService.getById(this.doctorId).subscribe({
        error: () => this.goBack(),
        next: (data: Doctor) => {
          this.doctor = { ...data };
        }
      });

      this.subscriptions.push(req);
    }
  }

  getDoctorTreatments() {
    if (this.doctorId) {
      const req = this.doctorService.getTreatments(this.doctorId).subscribe((data: Treatment[]) => {
        this.treatments = [...data];
      });

      this.subscriptions.push(req);
    }
  }

  getDoctorPatients() {
    if (this.doctorId) {
      const req = this.doctorService.getPatients(this.doctorId).subscribe((data: Patient[]) => {
        this.patients = [...data];
      });

      this.subscriptions.push(req);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  goBack() {
    this.router.navigate(['/doctors']);
  }

  patientDetails(patient: Patient) {
    this.router.navigate(['/patients/details'], { queryParams: { patientId: patient._id } });
  }
}
