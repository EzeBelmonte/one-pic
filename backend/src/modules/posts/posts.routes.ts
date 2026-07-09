import { Router } from "express";
import * as postController from "./posts.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";

const router: Router = Router();

router.post("/create", authenticate, postController.createPost);
router.get("/:postId", authenticate, postController.getPost);
router.patch("/:postId", authenticate, postController.updatePost);
router.delete("/postId", authenticate, postController.deletePost);

export default router;