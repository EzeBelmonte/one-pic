export interface CreatePost {
  description?: string;
}

export interface Post extends CreatePost {
  imageUrl: string;
  id: number;
  createdAt: string;
}

export interface UpdatePost {
  description?: string;
}