export const FOLLOW_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
} as const;

export type FollowStatus =
  typeof FOLLOW_STATUS[keyof typeof FOLLOW_STATUS];