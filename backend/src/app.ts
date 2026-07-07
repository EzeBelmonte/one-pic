import express, { type Express } from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes.js";

const app: Express = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.use("/auth", authRouter);

export default app;