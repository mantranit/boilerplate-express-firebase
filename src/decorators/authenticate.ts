import { UserRoles } from '../utils/enums';
import { MetadataKeys } from '../utils/metadata.keys';

const Authenticate = (roles: UserRoles[] | string = "*"): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.AUTHENTICATE, roles, target);
  };
}

export default Authenticate;
