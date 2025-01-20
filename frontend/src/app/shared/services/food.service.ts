import { Injectable } from '@angular/core';
import { Food } from '../../models/Food';
import { Tag } from '../../models/Tag';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../constants/urls';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAllFoods(): Observable<Food[]> {
    return this.http.get<any[]>(BACKEND_URL + '/foods');
  }

  getAllFoodBySeachTerms(searchTerm: string): Observable<Food[]> {
    return this.http.get<any[]>(BACKEND_URL + '/foods/search/' + searchTerm);
  }
  getFoodByID(id: string): Observable<Food> {
    return this.http.get<any>(BACKEND_URL + '/foods/' + id);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(BACKEND_URL + '/tags/');
  }
  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return this.http.get<Food[]>(BACKEND_URL + '/foods/getBytags/' + tag);
  }
}
