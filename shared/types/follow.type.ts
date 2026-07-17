const FOLLOW_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
} as const;

export type FollowStatus =
  typeof FOLLOW_STATUS[keyof typeof FOLLOW_STATUS];

export interface CreateFollow {  
  followerId: number;
  followingId: number;
  status?: FollowStatus;
}

export interface Follow {
  id: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
}