import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/Doctors';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent {
  subscriptions: Subscription[] = [];
  doctorId: string | undefined;
  doctor: Doctor | undefined;
  doctorModel: Doctor = {
    firstName: '',
    lastName: '',
    speciality: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private doctorService: DoctorService) {
    const reqParams = this.route.queryParams.subscribe((params) => {
      this.doctorId = params['doctorId'];
      if (this.doctorId) {
        const req = this.doctorService.getById(this.doctorId).subscribe({
          error: () => this.goBack(),
          next: (data: Doctor) => {
            this.doctor = { ...data };
            this.doctorModel = { ...data };
          }
        });

        this.subscriptions.push(req);
      }
    });

    this.subscriptions.push(reqParams);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  goBack() {
    this.router.navigate(['/doctors']);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const observable = this.doctorId
        ? this.doctorService.edit(this.doctorId, this.doctorModel)
        : this.doctorService.create(this.doctorModel);
      const req = observable.subscribe(() => this.router.navigate(['/doctors']));
      this.subscriptions.push(req);
    }
  }
}
