import { useContext } from "react";
import { FollowsContext } from "../providers/FollowsProvider";

export function useFollows() {
  const context = useContext(FollowsContext);

  if (!context) {
    throw new Error(
      "usePost debe usarse dentro de PostProvider"
    );
  }

  return context;
}