import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  currentLocation!: google.maps.LatLngLiteral;
  orderLocation!: google.maps.LatLngLiteral;
  addressLocation: string = '';
  currentPostalCode: string = '';

  public addressMap: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}
}
