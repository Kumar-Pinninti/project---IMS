import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';


const routes: Routes = [
  {path:'studentdashboard',component:StudentdashboardComponent,children:[
    {path: 'student-profile', component: ProfileComponent},
    {path:"studentdetails",component:StudentdetailsComponent},
    {path:"",redirectTo:"student-profile",pathMatch:"full"}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
