import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}
  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const currentUser = await this.authService.getUser();

    if (currentUser) {
      if (route.data && route.data.roles) {
        if (route.data.roles.includes(currentUser.role)) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const currentUser = await this.authService.getUser();
    console.log(currentUser);
    console.log(route);
    if (currentUser) {
      if (route.data && route.data.roles) {
        if (
          currentUser.role == '0' ||
          currentUser.role == '1' ||
          currentUser.role == '2'
        ) {
          console.log('yersd');
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
