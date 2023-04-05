import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/Doctors';
import { Treatment } from '../../models/Treatment';
import { TreatmentService } from '../../services/treatment.service';

@Component({
  selector: 'app-treatment-form',
  templateUrl: './treatment-form.component.html',
  styleUrls: ['./treatment-form.component.css']
})
export class TreatmentFormComponent {
  subscriptions: Subscription[] = [];
  doctors: Doctor[] = [];
  patientId: string | undefined;
  treatmentId: string | undefined;
  treatment: Treatment | undefined;
  today = new Date();
  treatmentModel: Treatment = {
    name: '',
    code: '',
    start: Date.now(),
    end: Date.now(),
    doctor: ''
  };

  dateRange = new FormGroup({
    start: new FormControl(null, Validators.required),
    end: new FormControl(null, Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private treatmentService: TreatmentService
  ) {
    const req = this.doctorService.fetchDoctors().subscribe((data: Doctor[]) => {
      this.doctors = data;
    });

    const reqParams = this.route.queryParams.subscribe((params) => {
      this.patientId = params['patientId'];
      if (!this.patientId) {
        this.goBack();
      }
    });

    this.subscriptions.push(req, reqParams);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  goBack() {
    this.router.navigate(['/patients']);
  }

  onSubmit(form: NgForm) {
    this.dateRange.markAllAsTouched();
    if (form.valid && this.patientId) {
      if (this.dateRange.value.start && this.dateRange.value.end) {
        this.treatmentModel.start = (this.dateRange.value.start as Date).getTime();
        this.treatmentModel.end = (this.dateRange.value.end as Date).getTime();
      }

      const req = this.treatmentService.create(this.patientId, this.treatmentModel).subscribe(() => {
        this.router.navigate(['/patients/details'], { queryParams: { patientId: this.patientId } });
      });
      this.subscriptions.push(req);
    }
  }

  onCancel() {
    this.router.navigate(['/patients/details'], { queryParams: { patientId: this.patientId } });
  }
}
