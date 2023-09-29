"use client";

import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { Session } from "next-auth";
import { useState } from "react";
import Link from "next/link";

import Avatar from "../Avatar";
import FeedImages from "../FeedImages";
import AlertModal from "../AlertModal";
import PostActions from "./PostActions";
import deletePost from "@/actions/posts/deletePost";
import { ExtendedPost } from "@/lib/types";

type PostItemProps = {
  post: ExtendedPost;
  session: Session | null;
};

const PostItem = ({ post, session }: PostItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const onDeletePost = async () => {
    setIsLoading(true);
    try {
      await deletePost({
        postId: post.id,
        path: pathname,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b hover:bg-neutral-100 cursor-pointer transition">
      <div className="flex items-start space-x-3 p-6">
        <Avatar src={post.creator.profileImage as string} />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-center space-x-2">
              <Link
                href={`/${post.creator.username}`}
                className="font-semibold hover:underline"
              >
                {post.creator.name}
              </Link>
              <Link
                href={`/${post.creator.username}`}
                className="text-neutral-600 hover:underline"
              >
                @{post.creator.username}
              </Link>

              <p className="text-neutral-600">
                {format(post.createdAt, "MM/dd/YYY")}
              </p>
            </div>
            {post.creatorId === session?.user.id && (
              <AlertModal onConfirm={onDeletePost} disabled={isLoading} />
            )}
          </div>
          <div className="mt-2">
            <p className="text-neutral-700">{post.body}</p>
            <div className="mt-2">
              <FeedImages data={post.images} />
            </div>
          </div>

          <div className="mt-4">
            <PostActions data={post} sessionId={session?.user.id!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
