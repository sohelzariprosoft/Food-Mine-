import { Component } from '@angular/core';
import { Food } from '../../../models/Food';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FoodService } from '../../../shared/services/food.service';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css',
})
export class FoodPageComponent {
  food!: Food;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {
    //this.food = this.activatedRoute.snapshot.data['food']; // Get data from resolve route guard.
    // activatedRoute.params.subscribe((params) => {
    //   if (params['id']) {
    //     foodService.getFoodByID(params['id']).subscribe({
    //       next: (food) => {
    //         this.food = food;
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       },
    //     });
    //   }
    // });
  }

  ngOnInit(): void {
    this.food = this.activatedRoute.snapshot.data['food'];
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
