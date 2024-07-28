import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(HttpException)
export class MyKiittenExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const httpStatus = exception.getStatus();

    response.status(httpStatus).json({
      status: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
