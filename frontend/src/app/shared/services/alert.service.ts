import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {
    this.logoutConfirmationObservable = this.logoutConfirmation.asObservable();
    this.cancelOrderConfirmationObservable =
      this.cancelOrderConfirmation.asObservable();
  }
  private logoutConfirmation: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public logoutConfirmationObservable: Observable<boolean> =
    new Observable<boolean>();

  private cancelOrderConfirmation: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public cancelOrderConfirmationObservable: Observable<boolean> =
    new Observable<boolean>();
  getSuccessAlert(
    title = 'Good job!',
    infoText = 'You completed task Successfully'
  ) {
    Swal.fire({
      title: title,
      text: infoText,
      icon: 'success',
    });
  }

  getErrorAlert(title = 'Oops...', infoText: string = 'Something went wrong!') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: infoText,
    });
  }

  getWarningAlert(text = 'Something went wrong!') {
    Swal.fire({
      icon: 'info',
      text: text,
    });
  }
  confirmationAlert(title: string | undefined) {
    Swal.fire({
      title: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,Logout!',
    }).then((result: any) => {
      console.log(result.isConfirmed);
      this.logoutConfirmation.next(result.isConfirmed);
    });
  }

  confirmationCancelOrderAlert(title: string | undefined) {
    Swal.fire({
      title: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result: any) => {
      console.log(result);
      this.cancelOrderConfirmation.next(result.isConfirmed);
    });
  }

  serverErrorAlert(
    title = 'Internal Server Error',
    infoText: string = 'Something went wrong!'
  ) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: infoText,
    });
  }
}
