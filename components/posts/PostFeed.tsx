"use client";

import { ExtendedPost } from "@/lib/types";
import PostItem from "./PostItem";
import { Session } from "next-auth";

type PostFeedProps = {
  data: ExtendedPost[] | undefined;
  session: Session | null;
};

const PostFeed = ({ data, session }: PostFeedProps) => {
  return (
    <>
      {data?.map((post) => (
        <PostItem key={post.id} post={post} session={session} />
      ))}
    </>
  );
};

export default PostFeed;
