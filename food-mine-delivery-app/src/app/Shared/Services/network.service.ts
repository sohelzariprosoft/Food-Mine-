import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private lastOnlineUrl: string = '';
  private isConnected: boolean = true;

  constructor(private router: Router) {
    this.monitorNetwork();
  }

  public get LastOnlineUrl() {
    return this.lastOnlineUrl;
  }
  public get IsConnected() {
    return this.isConnected;
  }
  // Monitor network changes
  public async monitorNetwork() {
    const status = await Network.getStatus();
    this.isConnected = status.connected;
    Network.addListener('networkStatusChange', (status) => {
      console.log('Network status changed:', status);
      this.isConnected = status.connected;
      this.handleNetworkChange();
    });
  }

  private handleNetworkChange() {
    if (this.isConnected) {
      // If online, navigate back to the last URL
      if (this.lastOnlineUrl) {
        const urlToNavigate = this.lastOnlineUrl;
        this.lastOnlineUrl = ''; // Clear the saved URL
        this.router.navigateByUrl(urlToNavigate);
      }
    } else {
      // If offline, save the current URL and navigate to the "offline" route
      this.lastOnlineUrl = this.router.url;
      this.router.navigate(['/offline']);
    }
  }
}
