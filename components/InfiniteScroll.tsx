"use client";

import { Session } from "next-auth";
import { useEffect, useState } from "react";

import Loader from "./Loader";
import { delay } from "@/lib/utils";
import PostFeed from "./posts/PostFeed";
import { ExtendedPost } from "@/lib/types";
import fetchPosts from "@/actions/posts/fetchPosts";
import { useInView } from "react-intersection-observer";

type InfiniteScrollProps = {
  userId?: string;
  session: Session | null;
};

const InfiniteScroll = ({ userId, session }: InfiniteScrollProps) => {
  const [posts, setPosts] = useState<ExtendedPost[]>([]);
  const [page, setPage] = useState(1);
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      fecthMorePosts();
    }
  }, [inView]);

  const fecthMorePosts = async () => {
    await delay(500);
    const nextPage = page + 1;
    const morePosts = await fetchPosts({ page: nextPage, userId });
    setPosts((prevPosts) => [...prevPosts, ...morePosts]);
    setPage(nextPage);
  };

  return (
    <div>
      <PostFeed data={posts} session={session} />
      <div ref={ref}>
        {!posts[posts.length - 1 || posts.length - 0] && <Loader />}
      </div>
    </div>
  );
};

export default InfiniteScroll;
