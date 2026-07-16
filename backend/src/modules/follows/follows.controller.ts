import type { Request, Response } from "express";

import * as followService from "./follows.service.js";

type FollowParams = {
  username: string;
}

// ========================================
// CREAR RELACIÓN
// ========================================
export async function createRelation(
  req: Request<FollowParams>,
  res: Response
) {
  try {
    // Usuario autenticado (el que sigue)
    const followerId = req.user.userId;

    // Usuario que quiero seguir
    const { username } = req.params;

    if (!username) {
      throw new Error("El usuario no existe");
    }

    const relation =
      await followService.createRelation(
        followerId,
        username
      );

    return res.status(201).json(relation);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error desconocido",
    });
  }
}