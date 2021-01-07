import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUsersGuard implements CanActivate {

  constructor(private userService: UserService) {
  }

  canActivate(): boolean {

    console.log('OnlyLoggedInUsersGuard');

    if (this.userService.isLoggedIn()) {

      console.log('You have permission to view this page');
      return true;
    } else {

      window.alert("You don't have permission to view this page");
      return false;
    }
  }

}
