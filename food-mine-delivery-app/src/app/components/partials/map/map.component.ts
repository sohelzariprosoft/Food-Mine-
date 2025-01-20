import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: false,
})
export class MapComponent implements OnInit {
  map!: google.maps.Map;

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const mapElement = document.getElementById('map') as HTMLElement;

    this.map = new google.maps.Map(mapElement, {
      center: { lat: 37.7749, lng: -122.4194 }, // San Francisco
      zoom: 12,
    });
  }
}
