import type { Follow } from "@shared/index.js";
import type { User } from "@shared/index.js";


export function toFollowDTO(user: User): Follow  {
  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname ?? "",
    profileImageUrl: user.profileImageUrl,
  }
}