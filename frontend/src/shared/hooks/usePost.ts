import { useState } from "react";

import type { PostSchema } from "../schemas/post.schema";
import * as postApi from "@/api/post.api";

import { getErrorMessage } from "../utils/getErrorMessage";

export function usePost() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function createPost(
    image: File,
    data: PostSchema
  ) {
    try {
      setLoading(true);
      setError(null);
      await postApi.createPost(image, data);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return {
    createPost,

    loading,
    error,
  };
}