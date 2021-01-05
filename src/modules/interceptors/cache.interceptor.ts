import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

//Stream overriding by CacheInterceptor
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true;
    console.log(context.switchToHttp().getRequest());
    console.log(context.switchToHttp().getResponse());

    return isCached === true ? of([]) : next.handle();
  }
}
