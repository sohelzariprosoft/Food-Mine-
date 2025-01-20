import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Food } from '../../models/Food';

export const getDataAPIInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  return next(req).pipe(
    map((event: any) => {
      if (req.method === 'GET') {
        if (event instanceof HttpResponse) {
          // Transform response for Tags API
          if (req.url.includes('/tags')) {
            const transformedTagsBody = event.body.Tags.map((item: any) => ({
              _id: item._id,
              name: item.name, // Transform name to uppercase
              count: item.count, // Format count as a string
            }));
            return event.clone({ body: transformedTagsBody });
          }

          // Transform response for Foods API
          if (req.url.includes('/foods')) {
            if (event.body.foods) {
              const transformedFoodBody = event.body.foods.map((item: any) => ({
                id: item._id, // Map `_id` to `id`
                name: item.name,
                price: item.price,
                tags: item.tags,
                faviroute: item.faviroute,
                stars: item.stars,
                imageUrl: item.imageUrl,
                origins: item.origins,
                cookTime: item.cookTime,
              }));
              return event.clone({ body: transformedFoodBody });
            } else if (event.body.food) {
              const body = event.body.food;
              const transformFoodBody: Food = {
                id: body._id,
                name: body.name,
                price: body.price,
                tags: body.tags,
                faviroute: body.faviroute,
                stars: body.stars,
                imageUrl: body.imageUrl,
                origins: body.origins,
                cookTime: body.cookTime,
              };
              return event.clone({ body: transformFoodBody });
            }
          }
        }
      }
      return event;
    })
  );
};
