import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public ls:LoginService, public router:Router) { }


  alertboolean:boolean=false;

  ngOnInit() {
    this.ls.logout();
  }

  login(dataObj){
    console.log(dataObj)
    if(dataObj.username=="admin-kumar" && dataObj.password == "Admin"){
      // alert("admin logged in succesfully");
      this.router.navigate(['/admindashboard']);
    }
    else{

      //console.log(dataObj)
  
      this.ls.loginUser(dataObj).subscribe(res  =>{

                res["message"]
                console.log(res["message"]);
                //alert("user logged in succesfully");
                if(res["message"]=="enter valid credentials")
                {
                  alert("enter valid credentials")
                  this.alertboolean=true;

                }
                else if(res["message"]=="invalid password")
                {
                alert("invalid password")
                }
                else 
                {
                  //alert("user logged in succesfully");
                  this.ls.isloggedin=true;
                  localStorage.setItem("token",res["token"]);
                  this.router.navigate(['/studentdashboard']);
                  this.ls.fromlogin(dataObj.username)
                }
      });
    
  }


  // when user forgot the password he click on forgot button

  // forgot()
  // {
  //   this.router.navigate(['/forgotpassword']);
  // }
    }
  }
