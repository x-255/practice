import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common"
import { Request, Response } from "express"
import path from "path"

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
    })
  }
}