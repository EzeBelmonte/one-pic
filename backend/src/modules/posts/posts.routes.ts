import { Router } from "express";
import * as postController from "./posts.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";

const router: Router = Router();

router.post("/", authenticate, postController.createPost);
router.patch("/:postId", authenticate, postController.updatePost);
router.delete("/postId", authenticate, postController.deletePost);

export default router;