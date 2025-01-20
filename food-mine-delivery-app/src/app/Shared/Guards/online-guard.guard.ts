import { CanDeactivateFn, Router } from '@angular/router';
import { NetworkService } from '../Services/network.service';
import { inject } from '@angular/core';

export const onlineGuardGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const networkService: NetworkService = inject(NetworkService);
  const router: Router = inject(Router);
  if (networkService.IsConnected) {
    router.navigateByUrl(networkService.LastOnlineUrl);
  }
  return false;
};
