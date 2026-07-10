import type { Request, Response } from "express";
import * as userService from "./users.service.js";
import type { UpdateUser } from "@shared/index.js";

// ========================================
// OBTENER MI USUARIO
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
// OBTENER OTRO USUARIO 
// ========================================
export async function getUser(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el usuario buscado
    const username = String(req.params.username);

    // Obtenemos el perfil propio
    const user = await userService.getUser(username);

    // Retornamos el perfil
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// ========================================
// ACTUALIZAR PERFIL
// ========================================
export async function updateUser(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID usuario logueado
    const userId = req.user.userId;

    // Obtenemos los datos actualizados
    const data: UpdateUser = req.body;

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