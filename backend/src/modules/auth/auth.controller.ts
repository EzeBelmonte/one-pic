import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema.js";
import * as authService from "./auth.service.js";

// ========================================
// REGISTRO
// ========================================
export async function register(
  req: Request, 
  res: Response
) {
  try {
    // Guardamos los datos recibido del frontend
    const data = registerSchema.parse(req.body);

    // Esperamos la respuesta de registro por parte del servicio
    const user = await authService.register(data);

    // Retornamos el usuario registrado
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// ========================================
// INICIO SESIÓN
// ========================================
export async function login(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos los datos del inicio de sesión
    const data = loginSchema.parse(req.body);

    const result = await authService.login(data);

    // Retornamos la sesión
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}