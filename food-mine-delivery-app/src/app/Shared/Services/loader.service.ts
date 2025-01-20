import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  pendingRequests: number = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  showLoading() {
    this.pendingRequests += 1;
    this.isLoadingSubject.next(true);
  }
  hideLoading() {
    this.pendingRequests = this.pendingRequests - 1;
    if (this.pendingRequests === 0) {
      this.isLoadingSubject.next(false);
    }
  }
  get isLoading() {
    return this.isLoadingSubject.asObservable();
  }
}
