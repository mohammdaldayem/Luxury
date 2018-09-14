import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../Services/User.service';

@Injectable()
export class logenUser implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isUserLogin()) {
      return true;
    } else {
      this.router.navigate(['/Auth'], {});
      return false;
    }
  }
}