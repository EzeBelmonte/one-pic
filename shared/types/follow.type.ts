export interface CreateFollow {  
  followerId: number;
  followingId: number;
  status?: "pending" | "accepted";
}

export interface Follow {
  id: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
}