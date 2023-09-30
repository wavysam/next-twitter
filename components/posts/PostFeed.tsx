import { ExtendedPost } from "@/lib/types";
import PostItem from "./PostItem";
import { getAuthSession } from "@/lib/auth";

type PostFeedProps = {
  data: ExtendedPost[] | undefined;
};

const PostFeed = async ({ data }: PostFeedProps) => {
  const session = await getAuthSession();
  return (
    <>
      {data?.map((post) => (
        <PostItem key={post.id} post={post} session={session} />
      ))}
    </>
  );
};

export default PostFeed;
