import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { RegisterComponent } from './register/register.component';
import { BatchComponent } from './batch/batch.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ViewattendanceComponent } from './viewattendance/viewattendance.component';


const routes: Routes = [
  {path:'admindashboard',component:AdmindashboardComponent,children:[
    {path:"batch",component:BatchComponent},
    {path:'register',component:RegisterComponent},
    {path:'attendance',component:AttendanceComponent},
    {path: 'view-attendance', component: ViewattendanceComponent},
    {path:'',redirectTo:"batch",pathMatch:"full"}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }