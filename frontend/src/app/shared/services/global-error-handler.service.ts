import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  private toastrService: ToastrService | undefined;
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    if (!this.toastrService) {
      this.toastrService = this.injector.get(ToastrService);
    }
    this.toastrService.error(error.message, 'Error!');
  }
}
