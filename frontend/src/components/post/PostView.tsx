import { Image } from "@/components";

import type { Post } from "@shared/index";
import { formatNormalDate } from "@/helpers/formatterDate.helper";

type PostViewProps = {
  posts: Post[];
}

const PostView = ({ posts }: PostViewProps) => {

  return (
    <div className="flex flex-col gap-10 px-2">
      {posts.map((post) => (
        <div className="
          flex flex-col
          p-3
          bg-[rgba(255,255,255,0.1)] rounded
        ">
          <Image 
            src={post.imageUrl}
            alt="Imagen publicada"
            className="rounded mx-auto max-w-[280px] sm:max-w-[400px] md:max-w-[700px]"
          />

          <p className="text-white mt-3 mb-5">{post.description}</p>
          <p className="text-white/50 text-[.75rem] ms-auto">{formatNormalDate(post.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}

export default PostView;