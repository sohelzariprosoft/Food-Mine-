import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { checkIsLogin } from '../Utils/checkIsLogin';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router: Router = inject(Router);
  const loggedInUser: checkIsLogin = inject(checkIsLogin);
  const isUserLoggedIn = loggedInUser.isLoggedIn();
  if (isUserLoggedIn) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
