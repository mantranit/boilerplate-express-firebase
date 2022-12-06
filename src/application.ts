import express, { Application as ExApplication, Handler, NextFunction, Request, Response } from 'express';
import { controllers } from './controllers';
import { MetadataKeys } from './utils/metadata.keys';
import { IRouter } from './utils/decorators/handlers.decorator';

class Application {
  private readonly _instance: ExApplication;

  get instance(): ExApplication {
    return this._instance;
  }

  constructor() {
    this._instance = express();
    this._instance.use(express.json());
    this.registerRouters();
    this.handleErrors();
  }

  private registerRouters(): void {
    const info: Array<{ api: string, handler: string }> = [];

    controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } = new controllerClass() as any;

      const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
      const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass);

      const exRouter = express.Router();

      routers.forEach(({ method, path, handlerName}) => {
        exRouter[method](
          path,
          controllerInstance[String(handlerName)].bind(controllerInstance),
          (req: Request, res: Response) => {
            res.json({
              success: true,
              message: res.locals.message || 'Successful',
              data: res.locals.data || {},
            });
          }
        );

        info.push({
          api: `${method.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controllerClass.name}.${String(handlerName)}`,
        });
      });

      this._instance.use(basePath, exRouter);
    });

    console.table(info);
  }

  private handleErrors(): void {
    this._instance.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.log(typeof err, err.name, err.message);
      res.status(404).json({
        success: false,
        message: err.message || 'Fail',
        data: null,
      })
    });
  }
}

export default new Application();
