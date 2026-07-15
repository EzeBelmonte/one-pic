import { relations } from "drizzle-orm";

import { users } from "./users.js";
import { posts } from "./posts.js";
import { follows } from "./follows.js";

// ========================================
// USERS
// ========================================
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),

  // Usuarios que me siguen
  followers: many(follows, {
    relationName: "followers",
  }),

  // Usuario a los que sigo
  following: many(follows, {
    relationName: "following",
  }),
}));

// ========================================
// POSTS
// ========================================
export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

// ========================================
// FOLLOWS
// ========================================
export const followsRelations = relations(follows, ({ one }) => ({
  // Usuario que sigue
  follower: one(users, {
    fields: [follows.followerId],
    references: [users.id],
    relationName: "following",
  }),

  // Usuario seguido
  following: one(users, {
    fields: [follows.followingId],
    references: [users.id],
    relationName: "follower",
  }),
}));