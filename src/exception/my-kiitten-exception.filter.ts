import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpExceptionResponse } from '../common/type/HttpExceptionResponse';

@Catch(HttpException)
export class MyKiittenExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const httpStatus = exception.getStatus();

    const errorResponse = exception.getResponse() as HttpExceptionResponse;

    response.status(httpStatus).json({
      status: httpStatus,
      timestamp: new Date().toISOString(),
      message: errorResponse.message,
      path: request.url,
    });
  }
}
