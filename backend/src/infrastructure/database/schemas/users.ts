import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

  username: varchar("username", { length: 100 })
    .notNull()
    .unique(),

  password: text("password").notNull(),

  nickname: varchar("nickname", { length: 30 }),

  profileImageUrl: varchar("profile_image_url", { length: 500 })
    .default("https://res.cloudinary.com/drbnfdrja/image/upload/v1783727171/user_default_ictjsq.png")
    .notNull(),
  
  profileImagePublicId: varchar("profile_image_public_id", { length: 255 })
    .default("")
    .notNull(),

  bio: text("bio"),

  isPrivate: boolean("is_private")
    .default(false)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});