import { z } from "zod";

// Datos que deberá ingresar el usuario al crease la cuenta
export const registerSchema = z.object({
  email: z.email(),

  username: z
    .string()
    .min(3)
    .max(30),

  password: z
    .string()
    .min(8),

});

// Datos para iniciar sesión
export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3),
  
  password: z
    .string()
    .min(8),
});