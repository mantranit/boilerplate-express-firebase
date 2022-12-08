import { NextFunction, Request, Response } from "express";
import Authenticate from "../decorators/authenticate";
import Authorize from "../decorators/authorize";
import Controller from "../decorators/controller";
import { Get, Post } from "../decorators/handlers";
import { UserRoles } from "../utils/enums";
import { NotFoundError } from "../utils/errors";

@Controller("/cats")
@Authenticate()
export default class CatController {
  private cats: Array<{ name: string }> = [{ name: "Tom" }, { name: "Kitty" }];

  @Get("/")
  public index(req: Request, res: Response, next: NextFunction): void {
    res.locals.data = this.cats;
    next();
  }

  @Post("/")
  @Authorize(UserRoles.ADMIN)
  public add(req: Request, res: Response, next: NextFunction): void {
    this.cats.push(req.body);
    next();
  }

  @Get("/:name")
  public findByName(req: Request, res: Response, next: NextFunction): void {
    const { name } = req.params;
    const foundCat = this.cats.find((c) => c.name === name);
    if (!foundCat) {
      throw new NotFoundError();
    }
    res.locals.data = { cat: foundCat };
    next();
  }
}
