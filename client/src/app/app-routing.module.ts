import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { TreatmentFormComponent } from './treatment-form/treatment-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/patients', pathMatch: 'full' },
  { path: 'patients', component: PatientListComponent, data: { label: 'Patients' } },
  { path: 'patients/form', component: PatientFormComponent },
  { path: 'patients/details', component: PatientDetailsComponent },
  { path: 'patients/treatments/form', component: TreatmentFormComponent },
  { path: 'doctors', component: DoctorListComponent, data: { label: 'Doctors' } },
  { path: 'doctors/form', component: DoctorFormComponent },
  { path: 'doctors/details', component: DoctorDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
