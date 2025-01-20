import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-ratings',
  templateUrl: './star-ratings.component.html',
  styleUrl: './star-ratings.component.css',
})
export class StarRatingsComponent {
  @Input() stars!: number;
  @Input() size: number = 1;

  get styles() {
    return {
      'width.rem': this.stars,
      'height.rem': this.size,
      'marginRight.rem': this.size / 6,
    };
  }

  getStarImage(current: number): string {
    const previousHalf = current - 0.5;
    const imageName =
      this.stars >= current
        ? 'star-full'
        : this.stars >= previousHalf
        ? 'star-half'
        : 'star-empty';
    return `/assets/stars/${imageName}.svg`;
  }
}
