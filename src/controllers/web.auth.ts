import { NextFunction, Request, Response } from "express";
import Controller from "../decorators/controller";
import { Get, Post } from "../decorators/handlers";

@Controller("")
export default class WebAuthController {
  @Get("/reset-password")
  public index(req: Request, res: Response, next: NextFunction): void {
    res.render("reset-password", { token: "token", error: {} });
  }
}
