import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Order } from '../../../models/Order';
import { LocationService } from '../../../shared/services/location.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  @Input()
  order!: Order;
  center!: google.maps.LatLngLiteral;
  clickedLocation: google.maps.LatLngLiteral | null = null;
  clickedAddress = '';
  zoom = 12; // Initial zoom level
  markerPosition: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };
  errorMessage: string = '';
  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setCurrentLocation();
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      const latLng = event.latLng.toJSON(); // Get clicked location's lat & lng
      this.markerPosition = latLng; // Update marker position
      this.clickedLocation = latLng; // Store lat & lng of clicked location
      this.order.addressLatLng = latLng;
      this.locationService.orderLocation = latLng;
      console.log('Clicked Location:', this.clickedLocation);
      this.convertLatLongTOAddress(latLng);
    }
  }

  convertLatLongTOAddress(location: any) {
    // Reverse Geocoding to get the address of clicked location on map
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: location }, (results, status) => {
      if (results) {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          this.locationService.addressMap.next(results[0].formatted_address); // Get the formatted address
          console.log(results[0]);
          const postalCodeComponent = results[0].address_components.find(
            (component) => component.types.includes('postal_code')
          );
          this.locationService.currentPostalCode =
            postalCodeComponent?.long_name.toString() || '';
          console.log('Clicked Location:', this.clickedLocation);
          console.log(this.locationService.addressLocation);
        } else {
          console.error('Geocoder failed due to:', status);
        }
      }
    });
  }

  private setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.markerPosition = this.center;
          this.locationService.currentLocation = this.center;
          this.convertLatLongTOAddress(this.center);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.errorMessage = 'User denied the request for Geolocation.';
              break;
            case error.POSITION_UNAVAILABLE:
              this.errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              this.errorMessage = 'The request to get user location timed out.';
              break;
            default:
              this.errorMessage = 'An unknown error occurred.';
          }
          console.error(this.errorMessage);
        }
      );
    } else {
      // Browser does not support Geolocation
      this.errorMessage = 'Geolocation is not supported by this browser.';
      console.error(this.errorMessage);
    }
  }
}
