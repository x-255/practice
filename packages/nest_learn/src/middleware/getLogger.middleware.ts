import { NextFunction, Request, Response } from "express"

export function getLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log("getLogger Request URL:", req.originalUrl)
  console.log("getLogger Request Method:", req.method)
  console.log("getLogger Request params:", req.params)
  next()
}