import { MetadataKeys } from "../utils/metadata.keys";

export interface IAuthorize {
  roles: string[];
  handlerName: string | symbol;
}

const Authorize = (roles: string[]): MethodDecorator => {
  return (target, propertyKey) => {
    const controllerClass = target.constructor;

    const authorizes: IAuthorize[] = Reflect.hasMetadata(
      MetadataKeys.AUTHORIZE,
      controllerClass
    )
      ? Reflect.getMetadata(MetadataKeys.AUTHORIZE, controllerClass)
      : [];

    authorizes.push({
      roles,
      handlerName: propertyKey,
    });

    Reflect.defineMetadata(MetadataKeys.AUTHORIZE, authorizes, controllerClass);
  };
};

export default Authorize;
