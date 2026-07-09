import { Router } from "express";
import * as authController from "./users.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";

const router: Router = Router();

router.get("/me", authenticate, authController.me);
router.get("/profile", authenticate, authController.profile);
router.put("/edit", authenticate, authController.updateProfile);

export default router;