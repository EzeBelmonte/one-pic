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

// ========================================
// RUTAS DEL MÓDULO FOLLOWS
// ========================================
router.post("/:username/follow", authenticate, followsController.createRelation);
router.delete("/:username/unfollow", authenticate, followsController.deleteRelation);

router.get("/:username/follow-status", authenticate, followsController.getRelation);
router.get("/followers-pendig", authenticate, followsController.getPendingRequest);

router.patch("/:username/follow-accept", authenticate, followsController.acceptRequest);
router.delete("/:username/follow-reject", authenticate, followsController.rejectRequest);

export default router;