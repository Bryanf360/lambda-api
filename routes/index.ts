import { Router } from "express";
import AuthRoutes from "./auth.routes";

const router = Router();

export { AppRoutes } from "./app.routes";
router.use("/api/auth", AuthRoutes);

export default router;
