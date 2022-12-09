import AuthController from "../controllers/auth";
import WebAuthController from "../controllers/web.auth";
import CatController from "../controllers/cat";

export const appRouters = [
  { rootPath: "/api/v1", controllers: [AuthController] },
  { rootPath: "/api/v2", controllers: [CatController] },
  { rootPath: "", controllers: [WebAuthController] },
];
