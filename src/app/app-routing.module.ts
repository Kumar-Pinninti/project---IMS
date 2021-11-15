import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutproComponent } from './aboutpro/aboutpro.component';



const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"aboutpro",component:AboutproComponent},
  {path:"login",component:LoginComponent},
  {path:'contact',loadChildren:()=>import('./contact/contact.module').then(someVar=>someVar.ContactModule)},
  {path:'',redirectTo:"/home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
