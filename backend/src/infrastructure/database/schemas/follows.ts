import {
  pgTable,
  pgEnum,
  serial,
  timestamp,
  integer,
  unique,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

import { FOLLOW_STATUS } from "../../../constants/follow.js";

export const followStatusEnum = pgEnum("follow_status", [
  FOLLOW_STATUS.PENDING,
  FOLLOW_STATUS.ACCEPTED,
]);

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
    status: followStatusEnum("status")
      .notNull()
      .default(FOLLOW_STATUS.ACCEPTED),

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