import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { RegisterComponent } from './register/register.component';
import { BatchComponent } from './batch/batch.component';
import { FormsModule } from '@angular/forms';
import { AttendanceComponent } from './attendance/attendance.component';
import { ViewattendanceComponent } from './viewattendance/viewattendance.component';


@NgModule({
  declarations: [AdmindashboardComponent, RegisterComponent, BatchComponent, AttendanceComponent, ViewattendanceComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
