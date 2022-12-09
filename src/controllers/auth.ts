import { NextFunction, Request, Response } from "express";
import Controller from "../decorators/controller";
import { Get, Post } from "../decorators/handlers";

@Controller("/auth")
export default class AuthController {

  @Get("/session")
  public index(req: Request, res: Response, next: NextFunction): void {
    res.locals.data = {};
    next();
  }
}
