import { eq } from "drizzle-orm";

import { db } from "../../infrastructure/database/db.js";
import { users } from "../../infrastructure/database/schemas/users.js";

import type { UpdateProfile } from "@shared/index.js";
import type { ImageItem } from "../../shared/types/uploadedImage.type.js";

// ========================================
// ACTUALIZAR USUARIO
// ========================================
export async function update(
  userId: number,
  data: UpdateProfile,
  image?: ImageItem,
) {
  const values = {
    ...data,
    updatedAt: new Date(),
    ...(image && {
      profileImageUrl: image.imageUrl,
      profileImagePublicId: image.imagePublicId,
    }),
  };

  const [user] = await db
    .update(users)
    .set(values)
    .where(eq(users.id, userId))
    .returning();

  return user;
}