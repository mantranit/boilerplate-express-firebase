import { NextFunction, Request, response, Response } from "express";
import Authenticate from "../decorators/authenticate";
import Authorize from "../decorators/authorize";
import Controller from "../decorators/controller";
import { Post } from "../decorators/handlers";
import { UserRoles } from "../utils/enums";
import { BadRequestError, UnauthorizedError } from "../utils/errors";
import { getFirestore } from "firebase-admin/firestore";

@Controller("/")
export default class AuthController {
  @Post("/register")
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { role = UserRoles.USER, ...restBody } = req.body;

      if (!Object.values(UserRoles).includes(role)) {
        throw new BadRequestError("Invalid role!");
      }
      const { admin } = req.app.locals;
      const userRecord = await admin.auth().createUser({
        ...restBody,
      });
      await admin.auth().setCustomUserClaims(userRecord.uid, { role });

      const db = getFirestore();
      await db
        .collection("users")
        .doc(userRecord.uid)
        .set({ refreshTime: new Date().getTime() });

      next();
    } catch (error) {
      next(error);
    }
  }
}
