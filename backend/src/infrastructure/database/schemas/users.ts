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

  avatarUrl: varchar("avatar_url", { length: 500 }),

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