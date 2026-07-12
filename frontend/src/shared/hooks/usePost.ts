import { useEffect, useState } from "react";

import * as postApi from "@/api/post.api";
import { getErrorMessage } from "../utils/getErrorMessage";

import type { PostSchema } from "../schemas/post.schema";
import type { Post } from "@shared/index";

export function usePost() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [myPosts, setMyPosts] = useState<Post[] | null>(null);

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

  useEffect(() => {
    async function getMyPosts() {
      try {
        setLoading(true);
        setError(null);
        const posts = await postApi.getMyPosts();
        setMyPosts(posts);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

    getMyPosts();
  }, []);

  return {
    createPost,
    myPosts,

    loading,
    setLoading,
    error,
  };
}