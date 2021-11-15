import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProtectGuard implements CanActivate {
  canActivate():boolean
    
  {
    let token = localStorage.getItem("token");
    
    if(token)
    {
      return true;
    }
    else
    {
      alert("login to access this")
      return false;
    }
  }
  
}
