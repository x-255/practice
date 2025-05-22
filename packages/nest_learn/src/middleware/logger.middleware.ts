import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request URL:", req.originalUrl)
    console.log("Request Method:", req.method)
    console.log("Request Body:", req.body)
    next()
  }
}