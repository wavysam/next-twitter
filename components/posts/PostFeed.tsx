import { Post } from "@prisma/client";
import PostItem from "./PostItem";
import { getAuthSession } from "@/lib/auth";

type PostFeedProps = {
  data: Post[];
};

const PostFeed = async ({ data }: PostFeedProps) => {
  const session = await getAuthSession();
  return (
    <>
      {data.map((post) => (
        <PostItem key={post.id} post={post} session={session} />
      ))}
    </>
  );
};

export default PostFeed;
