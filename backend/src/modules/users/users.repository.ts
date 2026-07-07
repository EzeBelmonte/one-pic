import { db } from "../../infrastructure/database/db.js";

// ========================================
// OBTENER DATOS DEL USUARIO
// ========================================
export async function findById(userId: number) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });
};