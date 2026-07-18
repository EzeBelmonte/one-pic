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

// ========================================
// COMPROBAR RELACIÓN
// ========================================
export async function getStatus(
  req: Request<{ username: string }>,
  res: Response
) {
  try {
    // Usuario autenticado (el que sigue)
    const followerId = req.user.userId;

    // Usuario que quiero seguir
    const { username } = req.params;

    const relation = followService.findStatus(
      followerId,
      username
    );

    console.log(relation)

    return res.status(200).json(relation);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error desconocido",
    });
  }
}

// ========================================
// ACEPTAR SOLICITUD
// ========================================
export async function acceptRequest(
  req: Request<{ username: string }>,
  res: Response
) {
  try {
    const userId = req.user.userId;
    const { username } = req.params;

    const relation =
      await followService.acceptRequest(
        userId,
        username
      );

    return res.status(200).json(relation);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error desconocido",
    });
  }
}

// ========================================
// RECHAZAR SOLICITUD
// ========================================
export async function rejectRequest(
  req: Request<{ username: string }>,
  res: Response
) {
  try {
    const userId = req.user.userId;
    const { username } = req.params;

    await followService.rejectRequest(
      userId,
      username
    );

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error desconocido",
    });
  }
}

// ========================================
// OBTENER SEGUIDORES
// ========================================
export async function getFollowers(
  req: Request<{ username: string }>,
  res: Response
) {
  try {
    const { username } = req.params;

    const followers = await followService.findFollowers(username);

    return res.status(201).json(followers);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error desconocido",
    });
  }
}

// ========================================
// OBTENER SEGUIDOS
// ========================================
export async function getFollowing(
  req: Request<{ username: string }>,
  res: Response
) {
  try {
    const { username } = req.params;

    const following = await followService.findFollowing(username);

    return res.status(201).json(following);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error desconocido",
    });
  }
}

// ========================================
// ELIMINAR RELACIÓN
// ========================================
export async function deleteRelation(
  req: Request<{ username: string }>,
  res: Response
) {
  try {
    const followerId = req.user.userId;
    const { username } = req.params;

    await followService.rejectRequest(
      followerId,
      username
    );
    
    await followService.deleteRelation(
      followerId,
      username
    );

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error desconocido",
    });
  }
}