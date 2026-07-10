import { eq } from "drizzle-orm";

import { db } from "../../infrastructure/database/db.js";
import { users } from "../../infrastructure/database/schemas/users.js";

import type { UpdateUser } from "@shared/index.js";

// ========================================
// OBTENER DATOS DEL USUARIO
// ========================================
export async function findById(userId: number) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });
};


// ========================================
// OBTENER USUARIO MEDIANTE USERNAME
// ========================================
export async function findUserByUsername(username: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      posts: true, // Representa información adicional
    },
  });
}

// ========================================
// ACTUALIZAR USUARIO
// ========================================
export async function update(
  userId: number,
  data: UpdateUser
) {
  const [user] = await db
    .update(users)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning();

  return user;
}