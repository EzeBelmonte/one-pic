import api from "axios";

import type { User } from "@/shared/types/user.type";

export async function getMe() {
  const response =
    await api.get<User>("/users/me");

  return response.data;
}