import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../Services/loader.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService: LoaderService = inject(LoaderService);
  loadingService.showLoading();
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          loadingService.hideLoading();
        }
      },
      error: (err) => {
        loadingService.hideLoading();
      },
    })
  );
};
