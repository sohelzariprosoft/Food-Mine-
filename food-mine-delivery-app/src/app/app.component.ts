import { Component } from '@angular/core';
import { NetworkService } from './Shared/Services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private networkService: NetworkService) {
    //networkService.monitorNetwork()
  }
}
