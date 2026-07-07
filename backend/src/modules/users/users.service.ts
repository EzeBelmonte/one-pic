import * as userRepository from "./users.repository.js";
import type { User } from "../../shared/types/user.dto.js";

// ========================================
// OBTENER DATOS DEL USUARIO
// ========================================
export async function getMe(userId: number) {
  // Obtenemos el usuario
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  const safeUser: User = {
    id: user.id,
    email: user.email,
    username: user.username,
    nickname: user.nickname,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }

  return safeUser;
}