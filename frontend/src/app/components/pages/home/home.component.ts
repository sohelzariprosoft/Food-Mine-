import { Component } from '@angular/core';
import { Food } from '../../../models/Food';
import { FoodService } from '../../../shared/services/food.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  foods: Food[] = [];

  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((param) => {
      if (param['searchTerm']) {
        foodService.getAllFoodBySeachTerms(param['searchTerm']).subscribe({
          next: (foods) => {
            this.foods = foods;
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else if (param['tag'])
        this.foodService.getAllFoodsByTag(param['tag']).subscribe({
          next: (foods) => {
            this.foods = foods;
          },
          error: (err) => {
            console.log(err);
          },
        });
      else {
        foodService.getAllFoods().subscribe({
          next: (foods) => {
            this.foods = foods;
            console.log(this.foods);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
