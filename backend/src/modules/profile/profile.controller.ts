import type { Request, Response } from "express";

import * as profileService from "./profile.service.js";

import type { UpdateProfile } from "@shared/index.js";

// ========================================
// OBTENER MI PERFIL 
// ========================================
export async function getMyProfile(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID usuario logueado
    const userId = req.user.userId;

    // Obtenemos el perfil propio
    const profile = await profileService.getMyProfile(userId);

    // Retornamos el perfil
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// ========================================
// OBTENER PERFIL DE USUARIO 
// ========================================
export async function getUserProfile(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el usuario buscado
    const username = String(req.params.username);

    // Obtenemos el perfil propio
    const profile = await profileService.getUserProfile(username);

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
export async function updateProfileUser(
  req: Request,
  res: Response
) {
  try {
  
    // Obtenemos el ID usuario logueado
    const userId = req.user.userId;

    // Obtenemos los datos actualizados
    const data: UpdateProfile = {
      ...req.body,
      isPrivate: req.body.isPrivate === "true",
    };

    // Obtener perfil del usuario
    const profile = await profileService.updateProfile(
      userId,
      req.file?.buffer,
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