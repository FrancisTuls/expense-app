import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    //*Outside of pipe, this is intercepting the request
    return next.handle().pipe(
      map((data) => {
        const response = {
          ...data,
          createdAt: data.created_at, //*Edited the data from created_at to createdAt
        };
        delete response.updated_at;
        delete response.created_at;
        return data; //*Inside of pipe, this is intercepting the response
      }),
    );
  }
}
