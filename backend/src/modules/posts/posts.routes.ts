import { Router } from "express";
import * as postController from "./posts.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";

const router: Router = Router();

router.post("/", authenticate, postController.createPost);
router.get("/me", authenticate, postController.getMyPosts);
router.patch("/:postId", authenticate, postController.updatePost);
router.delete("/:postId", authenticate, postController.deletePost);

// Público
router.get("/user/:username", postController.getUserPosts);
router.get("/:postId", postController.getPost);

export default router;