import { NextFunction, Request, response, Response } from "express";
import Controller from "../decorators/controller";
import { Get, Post } from "../decorators/handlers";
import { BadRequestError } from "../utils/errors";

@Controller("/")
export default class AuthController {
  @Get("/session")
  public getSession(req: Request, res: Response, next: NextFunction): void {
    res.locals.data = { foo: "bar" };
    next();
  }

  @Post("/create-account")
  public createAccount(req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body;
    if (!(email && password)) {
      throw new BadRequestError();
    }
    req.app.locals.admin
      .auth()
      .createUser(req.body)
      .then((response: any) => {
        res.locals.data = response;
        next();
      })
      .catch((error: any) => {
        next(error);
      });
  }
}
