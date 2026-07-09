export interface CreatePostDTO {
  imageUrl: string;
  description?: string;
}

export interface PostDTO {
  id: number;
  imageUrl: string;
  description?: string | null;
  createdAt: string;
}

export interface UpdatePostDTO {
  description?: string;
}