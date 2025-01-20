import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { FoodService } from '../services/food.service';
import { Food } from '../../models/Food';
import { Observable } from 'rxjs';

export const foodPageDataGuard: ResolveFn<Observable<Food>> = (
  route,
  state
) => {
  console.log(route);
  console.log(state);
  const foodService = inject(FoodService);
  const foodId = route.paramMap.get('id'); // Access the 'id' parameter from the route
  return foodService.getFoodByID(foodId ? foodId.toString() : '');
};
