import { NextFunction, Request, response, Response } from "express";
import Controller from "../decorators/controller";
import { Post } from "../decorators/handlers";
import { UserRoles } from "../utils/enums";
import { BadRequestError } from "../utils/errors";

@Controller("/")
export default class AuthController {
  @Post("/session")
  public session(req: Request, res: Response, next: NextFunction): void {
    res.locals.data = req.body;
    next();
  }

  @Post("/register")
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { idToken, email, password, role = UserRoles.USER } = req.body;
      const { admin } = req.app.locals;

      if (!Object.values(UserRoles).includes(role)) {
        throw new BadRequestError("Invalid role!");
      }
      let uid;
      if (idToken) {
        const claims = await admin.auth().verifyIdToken(idToken);
        await admin.auth().setCustomUserClaims(claims.sub, { role });
        uid = claims.sub;
      } else {
        if (!(email && password)) {
          throw new BadRequestError();
        }
        const user = await admin.auth().createUser(req.body);
        await admin.auth().setCustomUserClaims(user.uid, { role });
        uid = user.uid;
      }
      res.locals.data = {
        user: await admin.auth().getUser(uid),
      };
      next();
    } catch (error) {
      next(error);
    }
  }
}
