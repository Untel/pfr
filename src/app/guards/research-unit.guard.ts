import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResearchUnitGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.userService.user$.map(user => {

        if (user.role !== 'accounts-departement') {
          console.log('Cannot activate research-unit, redirecting to dashboard');
          return false;
        } else {
          console.log('Can access');
          return true;
        }
      });
    }
}
