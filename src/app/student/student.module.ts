import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule} from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { StudentRoutingModule } from './student-routing.module';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [StudentdashboardComponent, StudentdetailsComponent, ProfileComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StudentRoutingModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    })
  ]
})
export class StudentModule { }
