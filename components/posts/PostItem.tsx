"use client";

import { Comment, Post, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { format } from "date-fns";
import { Session } from "next-auth";

import Avatar from "../Avatar";
import FeedImages from "../FeedImages";
import AlertModal from "../AlertModal";
import PostActions from "./PostActions";
import deletePost from "@/actions/posts/deletePost";
import { useState } from "react";

type PostItemProps = {
  post: Post & {
    creator: User;
    comments: Comment[];
  };
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
              <p className="font-semibold hover:underline">
                {post.creator.name}
              </p>
              <p className="text-neutral-600 hover:underline">
                @{post.creator.username}
              </p>

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
            <PostActions
              data={post}
              sessionImage={session?.user.image!}
              sessionId={session?.user.id!}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
