import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { checkIsLogin } from '../Utils/checkIsLogin';

export const isLoggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loggedInUser: checkIsLogin = inject(checkIsLogin);
  const isUserLoggedIn = loggedInUser.isLoggedIn();
  if (isUserLoggedIn) {
    return false;
  }
  return true;
};
