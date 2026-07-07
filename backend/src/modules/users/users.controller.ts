import type { Request, Response } from "express";
import * as userService from "./users.service.js";

// ========================================
// OBTENER PERFIL
// ========================================
export async function profile(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el usuario logueado
    const userId = req.user.userId;

    // Obtenemos el usuario
    const user = await userService.getMe(userId);

    // Retornamos el usuario
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({
      message: error  instanceof Error ? error.message : "Error desconocido",
    });
  }
}