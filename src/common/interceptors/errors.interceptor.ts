import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  GatewayTimeoutException,
  ConflictException,
  BadGatewayException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const message: string =
          (Array.isArray(error?.response?.message)
            ? error?.response?.message?.[0]
            : error?.response?.message) || error.message;

        if (error?.status) {
          switch (error.status) {
            case HttpStatus.BAD_REQUEST:
              throw new BadRequestException(message);
            case HttpStatus.NOT_FOUND:
              throw new NotFoundException(message);
            case HttpStatus.GATEWAY_TIMEOUT:
              throw new GatewayTimeoutException(message);
            case HttpStatus.CONFLICT:
              throw new ConflictException(message);
            case HttpStatus.BAD_GATEWAY:
              throw new BadGatewayException(message);
            default:
              throw new InternalServerErrorException(message);
          }
        } else {
          throw error;
        }
      }),
    );
  }
}
