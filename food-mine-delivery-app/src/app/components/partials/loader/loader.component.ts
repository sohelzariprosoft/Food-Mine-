import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/Shared/Services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: false,
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private loaderService: LoaderService) {
    loaderService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit() {}
}
