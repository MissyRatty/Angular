import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AlwaysAuthGuard implements CanActivate {

  canActivate(): boolean {

      console.log("AlwaysAuthGuard");
      return true;
  }
  
}