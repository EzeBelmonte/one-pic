import type { Request, Response } from "express";
import * as userService from "./users.service.js";

// ========================================
// OBTENER MI USUARIO
// ========================================
export async function getMe(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID usuario logueado
    const userId = req.user.userId;

    // Obtenemos el perfil propio
    const profile = await userService.getMe(userId);

    // Retornamos el perfil
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}
