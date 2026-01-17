import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ApiResponse } from '../interfaces/response.interface';
import { MESSAGES } from 'src/product/constants/messages.constants';

@Catch()
export class ProductExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = MESSAGES.VALIDATION.SERVER_ERROR;
    let errors: ApiResponse['errors'];

    /* ---------------- HTTP Exceptions ---------------- */
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as any;

      if (Array.isArray(res?.message)) {
        message = MESSAGES.VALIDATION.VALIDATION_FAILED;
        errors = res.message.map((msg: string) => ({ message: msg }));
      } else {
        message = res?.message || exception.message;
      }
    } else if (exception instanceof QueryFailedError) {
      /* ---------------- Database Errors ---------------- */
      status = HttpStatus.BAD_REQUEST;

      const err = exception as any;
      switch (err.code) {
        case '23505':
          message = MESSAGES.VALIDATION.DUPLICATE_VALUE;
          break;
        case '23503':
          message = MESSAGES.VALIDATION.REFERENCE_NOT_EXIST;
          break;
        case '22P02':
          message = MESSAGES.VALIDATION.INVALID_FORMAT;
          break;
        default:
          message = MESSAGES.VALIDATION.DATABASE_ERROR;
      }
    }

    const apiResponse: ApiResponse = {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(apiResponse);
  }
}
