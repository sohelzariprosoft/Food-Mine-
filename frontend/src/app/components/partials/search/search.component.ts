import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FoodService } from '../../../shared/services/food.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchTerm: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private foodService: FoodService
  ) {
    activatedRoute.params.subscribe((param) => {
      if (param['searchTerm']) {
        this.searchTerm = param['searchTerm'];
      }
    });
  }

  search(term: string): void {
    if (term) {
      this.foodService.getAllFoodBySeachTerms(term).subscribe({
        next: (data) => {
          this.router.navigateByUrl('/search/' + term);
        },
      });
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
