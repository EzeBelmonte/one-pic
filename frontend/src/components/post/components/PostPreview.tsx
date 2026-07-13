import { Image } from "@/components";

type PostPreviewProps = {
  imageUrl: string;
}

const PostPreview = ({ imageUrl }: PostPreviewProps) => {

  return <>
    <Image 
      src={imageUrl}
      alt="Foto"
      className="rounded w-full"
    />
  </>
}

export default PostPreview;