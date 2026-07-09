export interface Post {
  id: number;
  imageUrl: string;
  description?: string | null;
  createdAt: string;
}

export interface UpdatePost {
  description?: string;
}