import { Router } from "express";

import * as profileController from "./profile.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";

const router: Router = Router();

// ========================================
// RUTAS DEL MÓDOLO USERS - PRIVADAS
// ========================================
router.get("/", authenticate, profileController.getMyProfile);
router.patch("/config", authenticate, upload.single("image"), profileController.updateProfileUser);

// ========================================
// RUTAS DEL MÓDOLO USERS - PÚBLICAS
// ========================================
router.get("/:username", profileController.getUserProfile);

export default router;