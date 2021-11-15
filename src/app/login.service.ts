import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  stdid:number;

  isloggedin:boolean=false;
  
  constructor(public hc:HttpClient) { }

  loginUser(dataObj):Observable<any>
  {
    return this.hc.post('/login',dataObj);
  }

  
  
  fromlogin(id)
  {
   return this.stdid = id;
  }

  fromservice()
  {
    return this.stdid
  }

  // after logout to remove the token from local storage
  logout()
  {
    localStorage.clear();
    this.isloggedin=false;
  }

  id:any;

  // to verify the user during forgot password
  toService(id)
  {
      this.id=id;
  }

  sendtootp()
  {
    console.log(this.id);
    return this.id;
  }
}
