import {
  pgTable,
  serial,
  timestamp,
  integer,
  varchar,
  unique,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const follows = pgTable(
  "follows",
  {
    id: serial("id").primaryKey(),

    // Usuario que quiere seguir
    followerId: integer("follower_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    // Usuario que recibe el seguimiento
    followingId: integer("following_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    // pending | accepted
    status: varchar("status", {
      length: 20,
    })
      .notNull()
      .default("accepted"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("unique_follow").on(
      table.followerId,
      table.followingId
    ),
  ]
);