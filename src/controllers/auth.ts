import { NextFunction, Request, Response } from "express";
import Controller from "../decorators/controller";
import { Post } from "../decorators/handlers";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../utils/errors";
import { User, UserStatus } from "../database/entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateEmail, validatePassword } from "../utils/validations";
import { Session } from "../database/entities/Session";
import config from "../utils/config";
import { getAccessToken, getRefreshToken } from "../utils/tokens";

@Controller("/")
export default class AuthController {
  @Post("/register")
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const { dataSource } = req.app.locals;
      const userRepository = dataSource.getRepository(User);

      // validate
      if (!(email && validateEmail(email))) {
        return next(
          new BadRequestError("Please enter an valid email address.")
        );
      }
      const existEmail = await userRepository.findOneBy({ email });
      if (existEmail) {
        return next(new BadRequestError("This email already exists."));
      }
      if (!password) {
        return next(new BadRequestError("Please enter your password."));
      }
      if (password && !validatePassword(password)) {
        return next(
          new BadRequestError("Password does not meet requirements.")
        );
      }

      const user = await userRepository.create({
        email,
        hashPassword: bcrypt.hashSync(password, 12),
      });

      const { hashPassword: _, ...results } = await userRepository.save(user);

      res.locals.data = { user: results };
      next();
    } catch (error) {
      next(error);
    }
  }

  @Post("/login")
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const { dataSource } = req.app.locals;
      const userRepository = dataSource.getRepository(User);
      const sessionRepository = dataSource.getRepository(Session);

      // validate
      if (!(email && validateEmail(email))) {
        return next(
          new BadRequestError("Please enter an valid email address.")
        );
      }
      const user = await userRepository.findOneBy({
        email,
      });
      if (!user) {
        return next(new NotFoundError("Email was not found."));
      }

      const statusAbleToLogin = [UserStatus.ACTIVE, UserStatus.PENDING];
      if (!statusAbleToLogin.includes(user.status)) {
        return next(
          new ForbiddenError(
            "This account is " + user.status.toLowerCase() + "."
          )
        );
      }
      if (!password) {
        return next(new BadRequestError("Please enter your password."));
      }
      if (!bcrypt.compareSync(password, user.hashPassword)) {
        return next(
          new BadRequestError("Incorrect password. Please try again.")
        );
      }

      const accessToken = getAccessToken(user.id);
      const refreshToken = getRefreshToken(user.id);
      const session = await sessionRepository.create({
        user,
        email: user.email,
        accessToken,
        refreshToken,
        userAgent: req.get("User-Agent"),
      });

      const results = await sessionRepository.save(session);

      res.cookie("__refreshToken", refreshToken, { httpOnly: true });
      delete user.hashPassword;
      res.locals.data = {
        user,
        session: {
          accessToken: results.accessToken,
        },
      };
      next();
    } catch (error) {
      next(error);
    }
  }

  @Post("/refresh")
  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { __refreshToken: refToken } = req.cookies;
      const { dataSource } = req.app.locals;

      jwt.verify(refToken, config.jwtRefreshKey);

      const sessionRepository = dataSource.getRepository(Session);
      const session = await sessionRepository.findOneBy({
        refreshToken: refToken,
      });
      if (!session) {
        return next(new BadRequestError("Session was not found."));
      }
      const newToken = getAccessToken(session.user.id);
      session.accessToken = newToken;
      const results = await sessionRepository.save(session);

      res.locals.data = {
        session: {
          accessToken: results.accessToken,
        },
      };
      next();
    } catch (error) {
      next(error);
    }
  }
}
