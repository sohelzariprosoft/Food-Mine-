import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { map } from 'rxjs';
import { User } from '../../models/User';

export const postDataAPIInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  return next(req).pipe(
    map((event: any) => {
      if (req.method === 'POST') {
        console.log('In Pinp');
        if (event instanceof HttpResponse) {
          if (req.url.includes('signIn')) {
            const respBodyUser = event.body.data?.user;
            console.log(event.body.data);
            const userBody: User = {
              name: respBodyUser.name,
              email: respBodyUser.email,
              isAdmin: respBodyUser.isAdmin,
              address: respBodyUser.address,
              token: event.body.data?.token,
            };
            return event.clone({ body: userBody });
          }

          if (req.url.includes('signUp')) {
            const respBodyUser = event.body.data?.userData;
            const userBody: User = {
              name: respBodyUser.name,
              email: respBodyUser.email,
              isAdmin: respBodyUser.isAdmin,
              address: respBodyUser.address,
              token: respBodyUser.token,
            };
            return event.clone({ body: userBody });
          }
        }
      }

      return event;
    })
  );
};
