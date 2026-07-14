import { Router } from "express";
import * as authController from "./users.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";

const router: Router = Router();

router.get("/me", authenticate, authController.me);
router.patch("/me", authenticate, upload.single("image"), authController.updateUser);

// Público
router.get("/:username", authenticate, authController.getUser);

export default router;