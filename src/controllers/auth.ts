import { NextFunction, Request, response, Response } from "express";
import Authenticate from "../decorators/authenticate";
import Authorize from "../decorators/authorize";
import Controller from "../decorators/controller";
import { Post } from "../decorators/handlers";
import { UserRoles } from "../utils/enums";
import { BadRequestError, UnauthorizedError } from "../utils/errors";

@Controller("/")
export default class AuthController {
  @Post("/register")
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { role = UserRoles.USER } = req.body;
      const { session } = res.locals;

      if (!Object.values(UserRoles).includes(role)) {
        throw new BadRequestError("Invalid role!");
      }
      if (!session) {
        throw new UnauthorizedError();
      }

      const { sub: uid } = session;
      const { admin } = req.app.locals;
      await admin.auth().setCustomUserClaims(uid, { role });

      next();
    } catch (error) {
      next(error);
    }
  }
}
