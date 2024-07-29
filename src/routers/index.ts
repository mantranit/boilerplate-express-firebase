import AuthController from "../controllers/auth";
import CatController from "../controllers/cat";

export const appRouters = [
  { rootPath: "/api/v1", controllers: [AuthController, CatController] },
];
