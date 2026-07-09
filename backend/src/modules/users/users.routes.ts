import { Router } from "express";
import * as authController from "./users.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";

const router: Router = Router();

router.get("/me", authenticate, authController.me);
router.get("/me/profile", authenticate, authController.MyProfile);
router.patch("/me", authenticate, authController.updateUser);

// Público
router.get("/:username", authenticate, authController.getProfile);

export default router;