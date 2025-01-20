import { Component, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-offline-page',
  templateUrl: './offline-page.component.html',
  styleUrls: ['./offline-page.component.scss'],
  standalone: false,
})
export class OfflinePageComponent {
  constructor() {}

  async retryConnection() {
    const status = await Network.getStatus();
    if (status.connected) {
      // Navigate back to the previous route or dashboard
      window.location.reload(); // Reload the app (optional)
    } else {
      // Optionally show a toast message
      alert('Still offline. Please check your connection.');
    }
  }
}
