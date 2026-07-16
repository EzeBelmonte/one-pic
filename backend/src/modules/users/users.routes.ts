import { Router } from "express";

import * as authController from "./users.controller.js";
import * as followsController from "../follows/follows.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";

const router: Router = Router();

// ========================================
// RUTAS DEL MÓDOLO USERS - PRIVADAS
// ========================================
router.get("/me", authenticate, authController.getMe);
router.patch("/me", authenticate, upload.single("image"), authController.updateUser);

// ========================================
// RUTAS DEL MÓDOLO USERS - PÚBLICAS
// ========================================
router.get("/:username", authenticate, authController.getUser);

// ========================================
// RUTAS DEL MÓDULO FOLLOWS
// ========================================
router.post("/:username/follow", authenticate, followsController.createRelation);
router.delete("/:username/follow", authenticate, followsController.deleteRelation);

router.get("/:username/followers", authenticate, followsController.getFollowers);
router.get("/:username/following", authenticate, followsController.getFollowing);

router.patch("/:username/follow/accept", authenticate, followsController.acceptRequest);
router.delete("/:username/follow/reject", authenticate, followsController.rejectRequest);

export default router;