const FOLLOW_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
} as const;

export type FollowStatus =
  typeof FOLLOW_STATUS[keyof typeof FOLLOW_STATUS];

export interface FollowState {
  isFollowing: boolean;
  isPending: boolean;
}

export interface CreateFollow {  
  followerId: number;
  followingId: number;
  status?: FollowStatus;
}

export interface FollowBase {
  id: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
}

export interface PendingFollowers extends FollowBase {
  status: "pending";
}

export interface Follow extends FollowBase {

}