import type { Request, Response } from "express";
import * as userService from "./users.service.js";
import type { UpdateUserDTO } from "../../shared/types/user.dto.js";

// ========================================
// OBTENER MI PERFIL
// ========================================
export async function me(
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

// ========================================
// OBTENER PERFIL AJENO
// ========================================
export async function profile(
  req: Request,
  res: Response
) {
  try {
    /// Obtenemos el ID usuario logueado
    const userId = req.user.userId;

    // Obtener perfil del usuario
    const profile = await userService.getProfile(userId);

    // Retornamos el perfil
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// ========================================
// ACTUALIZAR PERFIL
// ========================================
export async function updateProfile(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID usuario logueado
    const userId = req.user.userId;

    // Obtenemos los datos actualizados
    const data: UpdateUserDTO = req.body;

    // Obtener perfil del usuario
    const profile = await userService.updateProfile(
      userId,
      data
    );

    // Retornamos el perfil
    return res.status(200).json(profile);
    
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}