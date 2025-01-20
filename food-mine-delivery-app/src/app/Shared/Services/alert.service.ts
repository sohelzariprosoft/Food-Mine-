import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  successAlert(title: string, infoText: string = '') {
    Swal.fire({
      icon: 'success',
      title: title,
      text: infoText,
    });
  }

  errorAlert(title: string, infoText: string = 'Something went wrong.') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: infoText,
    });
  }

  warningAlert(title: string, infoText: string = '') {
    Swal.fire({
      title: title,
      text: infoText,
      icon: 'warning',
    });
  }
  confirmationAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
