import { NextFunction, Request, Response } from "express";
import Authorize from "../decorators/authorize";
import Controller from "../decorators/controller";
import { Get, Post } from "../decorators/handlers";
import { NotFoundError } from "../utils/errors";

@Controller("/cats")
export default class CatController {
  private cats: Array<{ name: string }> = [{ name: "Tom" }, { name: "Kitty" }];

  @Get("")
  @Authorize(['admin'])
  public index(req: Request, res: Response, next: NextFunction): void {
    res.locals.data = this.cats;
    next();
  }

  @Post("")
  public add(req: Request, res: Response): void {
    this.cats.push(req.body);
    res.status(204).json();
  }

  @Get("/:name")
  public findByName(req: Request, res: Response, next: NextFunction): void {
    const { name } = req.params;
    const foundCat = this.cats.find((c) => c.name === name);
    if (!foundCat) {
      throw new NotFoundError("Cat not found!!!!!!!!!!!");
    }
    res.locals.data = { cat: foundCat };
    next();
  }
}
