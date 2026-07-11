import express, { type Express } from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/users/users.routes.js";
import postRouter from "./modules/posts/posts.routes.js";

const app: Express = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

export default app;