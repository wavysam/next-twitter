import { ExtendedPost } from "@/lib/types";
import PostItem from "./PostItem";
import { getAuthSession } from "@/lib/auth";
import { delay } from "@/lib/utils";

type PostFeedProps = {
  data: ExtendedPost[] | undefined;
};

const PostFeed = async ({ data }: PostFeedProps) => {
  const session = await getAuthSession();
  await delay(1500);
  return (
    <>
      {data?.map((post) => (
        <PostItem key={post.id} post={post} session={session} />
      ))}
    </>
  );
};

export default PostFeed;
