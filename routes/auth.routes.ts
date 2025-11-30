import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Instancias correctas
const authService = new AuthService();
const controller = new AuthController(authService);

// Rutas
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile", authMiddleware, controller.profile);

export default router;

//export class AuthRoutes {
//    static get routes() {
//        return router;
//    }
//}