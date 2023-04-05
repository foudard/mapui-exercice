import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Doctor } from '../../models/Doctors';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/Patients';
import { Treatment } from '../../models/Treatment';
import { TreatmentService } from '../../services/treatment.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent {
  subscriptions: Subscription[] = [];
  patientId: string | undefined;
  patient: Patient | undefined;

  treatmentsColumns = [
    { field: 'Name', value: (item: Treatment) => item.name },
    { field: 'Start', value: (item: Treatment) => new Date(item.start).toLocaleDateString() },
    { field: 'End', value: (item: Treatment) => new Date(item.end).toLocaleDateString() },
    { field: 'Code', value: (item: Treatment) => item.code },
    {
      field: 'Doctor',
      value: (item: Treatment) => `${(item.doctor as Doctor).firstName} ${(item.doctor as Doctor).lastName}`,
      link: (item: Treatment) => `/doctors/details?doctorId=${(item.doctor as Doctor)._id}`
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private treatmentService: TreatmentService
  ) {
    const req = this.route.queryParams.subscribe((params) => {
      this.patientId = params['patientId'];
      this.getPatient();
    });

    this.subscriptions.push(req);
  }

  getPatient() {
    if (this.patientId) {
      const req = this.patientService.getById(this.patientId).subscribe({
        error: () => this.goBack(),
        next: (data: Patient) => {
          this.patient = { ...data };
        }
      });

      this.subscriptions.push(req);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  goBack() {
    this.router.navigate(['/patients']);
  }

  addTreatment() {
    this.router.navigate(['/patients/treatments/form'], { queryParams: { patientId: this.patientId } });
  }

  removeTreatment(treatment: Treatment) {
    if (this.patientId && treatment._id) {
      const sub = this.treatmentService.remove(this.patientId, treatment._id).subscribe(() => this.getPatient());
      this.subscriptions.push(sub);
    }
  }
}
