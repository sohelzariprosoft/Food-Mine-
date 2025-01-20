import { CanActivateFn, Router } from '@angular/router';
import { NetworkService } from '../Services/network.service';
import { inject } from '@angular/core';

export const offlineGuard: CanActivateFn = (route, state) => {
  const networkService: NetworkService = inject(NetworkService);
  if (!networkService.IsConnected) {
    return true;
  }
  return false;
};
