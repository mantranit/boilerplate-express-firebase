import express, {
  Application as ExApplication,
  Handler,
  NextFunction,
  Request,
  Response,
} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "./middlewares/morgan";
import { appRouters } from "./routers";
import { MetadataKeys } from "./utils/metadata.keys";
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  NotAcceptableError,
  NotFoundError,
  UnauthorizedError,
} from "./utils/errors";
import { IRouter } from "./decorators/handlers";
import { IAuthorize } from "./decorators/authorize";
import { UserRoles } from "./utils/enums";

class Application {
  private readonly _instance: ExApplication;

  get instance(): ExApplication {
    return this._instance;
  }

  constructor() {
    this._instance = express();
    this._instance.use(morgan);
    this._instance.use(express.json());
    this._instance.use(express.urlencoded({ extended: false }));
    this._instance.use(cors({ origin: "*" }));
    this._instance.use(cookieParser());
    this.middleware();
    this.registerRouters();
    this.handleErrors();
  }

  private middleware(): void {
    this._instance.use(
      async (req: Request, res: Response, next: NextFunction) => {
        res.locals.session = null;
        try {
          const { authorization } = req.headers;
          if (authorization) {
            const tmp = authorization.split(" ");
            if (tmp.length === 2 && tmp[0] === "Bearer") {
              const { admin } = req.app.locals;
              res.locals.session = await admin.auth().verifyIdToken(tmp[1]);
            }
          }
          next();
        } catch (error) {
          next(error);
        }
      }
    );
  }

  private registerRouters(): void {
    appRouters.forEach((appRouter) => {
      const { rootPath, controllers } = appRouter;
      controllers.forEach((controllerClass) => {
        const controllerInstance: { [handleName: string]: Handler } =
          new controllerClass() as any;

        const basePath: string = Reflect.getMetadata(
          MetadataKeys.BASE_PATH,
          controllerClass
        );
        const authenticate: string = Reflect.getMetadata(
          MetadataKeys.AUTHENTICATE,
          controllerClass
        );
        const routers: IRouter[] = Reflect.getMetadata(
          MetadataKeys.ROUTERS,
          controllerClass
        );
        const authorizes: IAuthorize[] =
          Reflect.getMetadata(MetadataKeys.AUTHORIZE, controllerClass) || [];

        const exRouter = express.Router();

        routers.forEach(({ method, path, handlerName }) => {
          exRouter[method](
            path,
            (req: Request, res: Response, next: NextFunction) => {
              let roles: UserRoles[] | string = authenticate;
              for (let i = 0; i < authorizes.length; i++) {
                if (authorizes[i].handlerName === handlerName) {
                  roles = authorizes[i].roles;
                }
              }
              if (roles) {
                if (roles === "*" && !res.locals?.session?.roles) {
                  throw new UnauthorizedError();
                }

                if (typeof roles === "string") {
                  roles = [roles as UserRoles];
                }
                if (!roles.includes(res.locals?.session?.roles)) {
                  throw new ForbiddenError();
                }
              }
              next();
            },
            controllerInstance[String(handlerName)].bind(controllerInstance),
            (req: Request, res: Response) => {
              res.json({
                success: true,
                message: res.locals.message || "Success",
                data: res.locals.data || null,
                session: res.locals.session,
              });
            }
          );
        });
        this._instance.use(`${rootPath}${basePath}`, exRouter);
      });
    });
  }

  private handleErrors(): void {
    this._instance.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        let statusCode = 520;
        if (err instanceof BadRequestError) {
          statusCode = 400;
        } else if (err instanceof UnauthorizedError) {
          statusCode = 401;
        } else if (err instanceof ForbiddenError) {
          statusCode = 403;
        } else if (err instanceof NotFoundError) {
          statusCode = 404;
        } else if (err instanceof MethodNotAllowedError) {
          statusCode = 405;
        } else if (err instanceof NotAcceptableError) {
          statusCode = 406;
        } else if (err instanceof InternalServerError) {
          statusCode = 500;
        }

        res.status(statusCode).json({
          success: false,
          message: err.message || "Failure",
          data: null,
          session: res.locals.session,
        });
      }
    );
  }
}

export default new Application();
