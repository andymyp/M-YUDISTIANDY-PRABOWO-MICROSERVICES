import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { catchError, map, tap } from 'rxjs/operators';
import { AUTH_SERVICE } from '../constants/service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      return false;
    }

    return this.authClient
      .send('authenticate', {
        Authentication: token,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest<Request>().user = res;
        }),
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
