import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/Patients';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent {
  subscriptions: Subscription[] = [];
  patientId: string | undefined;
  patient: Patient | undefined;
  patientModel: Patient = {
    firstName: '',
    lastName: '',
    gender: '',
    age: undefined
  };

  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientService) {
    const reqParams = this.route.queryParams.subscribe((params) => {
      this.patientId = params['patientId'];
      if (this.patientId) {
        const req = this.patientService.getById(this.patientId).subscribe({
          error: () => this.goBack(),
          next: (data: Patient) => {
            this.patient = { ...data };
            this.patientModel = { ...data };
          }
        });

        this.subscriptions.push(req);
      }
    });

    this.subscriptions.push(reqParams);
  }

  goBack() {
    this.router.navigate(['/patients']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const observable = this.patientId
        ? this.patientService.edit(this.patientId, this.patientModel)
        : this.patientService.create(this.patientModel);
      const req = observable.subscribe(() => this.router.navigate(['/patients']));
      this.subscriptions.push(req);
    }
  }
}
