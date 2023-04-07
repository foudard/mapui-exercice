import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/Doctors';
import { TableColumn } from '../table/table.component';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent {
  doctorSub: Subscription;
  doctors: Doctor[] = [];
  columns: TableColumn<Doctor>[] = [
    { field: 'Last name', value: (item) => item.lastName },
    { field: 'First name', value: (item) => item.firstName },
    { field: 'Speciality', value: (item) => item.speciality }
  ];

  constructor(private doctorService: DoctorService, private router: Router) {
    this.doctorSub = this.doctorService.fetchDoctors().subscribe((data: Doctor[]) => {
      this.doctors = data;
    });
  }

  ngOnDestroy() {
    this.doctorSub.unsubscribe();
  }

  addDoctor() {
    this.router.navigate(['/doctors/form']);
  }

  editDoctor(doctor: Doctor) {
    this.router.navigate(['/doctors/form'], { queryParams: { doctorId: doctor._id } });
  }

  doctorDetails(doctor: Doctor) {
    this.router.navigate(['/doctors/details'], { queryParams: { doctorId: doctor._id } });
  }
}
