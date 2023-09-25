"use client";

import { Comment, Post, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

import Avatar from "../Avatar";
import FeedImages from "../FeedImages";
import AlertModal from "../AlertModal";
import PostActions from "./PostActions";
import { Session } from "next-auth";

type PostItemProps = {
  post: Post & {
    creator: User;
    comments: Comment[];
  };
  session: Session | null;
};

const PostItem = ({ post, session }: PostItemProps) => {
  const router = useRouter();

  const {
    mutate: deletePost,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/post/${post.id}`);
      return data;
    },
    onError: () => {},
    onSuccess: () => {
      router.refresh();
      toast.success("Post deleted");
    },
  });

  return (
    <div className="border-b hover:bg-neutral-100 cursor-pointer transition">
      <div className="flex items-start space-x-3 p-6">
        <Link href={`/${post.creator.username}`}>
          <Avatar src={post.creator.profileImage as string} />
        </Link>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-center space-x-2">
              <Link
                href={`/${post.creator.username}`}
                className="flex space-x-3"
              >
                <p className="font-semibold hover:underline">
                  {post.creator.name}
                </p>
                <p className="text-neutral-600 hover:underline">
                  @{post.creator.username}
                </p>
              </Link>
              <p className="text-neutral-600">
                {format(post.createdAt, "MM/dd/YYY")}
              </p>
            </div>
            {post.creatorId === session?.user.id && (
              <AlertModal
                onConfirm={deletePost}
                disabled={isLoading}
                isSuccess={isSuccess}
              />
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
