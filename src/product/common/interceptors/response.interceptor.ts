import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/response.interface';
import { MESSAGES } from 'src/product/constants/messages.constants';

@Injectable()
export class ProductResponseInterceptor implements NestInterceptor<
  any,
  ApiResponse<any>
> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<any>> {
    const res = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        const statusCode = res.statusCode as HttpStatus;

        const message =
          this.reflector.get<string>('responseMessage', context.getHandler()) ||
          this.getDefaultMessage(statusCode);

        if (data?.data && typeof data.total === 'number') {
          const { data: items, total, page = 1, limit = 10 } = data;

          return {
            success: true,
            message,
            data: items,
            meta: {
              total,
              page,
              limit,
              totalPages: Math.ceil(total / limit),
            },
            timestamp: new Date().toISOString(),
          };
        }

        return {
          success: true,
          message,
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }

  private getDefaultMessage(status: HttpStatus): string {
    if (status === HttpStatus.CREATED) return MESSAGES.VALIDATION.CREATED;
    else if (status === HttpStatus.NO_CONTENT)
      return MESSAGES.VALIDATION.DELETED;
    return MESSAGES.VALIDATION.SUCCESS;
  }
}
