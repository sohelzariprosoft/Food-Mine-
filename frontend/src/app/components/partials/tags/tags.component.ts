import { Component } from '@angular/core';
import { FoodService } from '../../../shared/services/food.service';
import { Tag } from '../../../models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent {
  tags?: Tag[];
  constructor(foodService: FoodService) {
    foodService.getAllTags().subscribe({
      next: (tags) => {
        this.tags = tags;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {}
}
