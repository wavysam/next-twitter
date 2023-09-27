"use client";

import { Comment } from "@prisma/client";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { likeComment } from "@/actions/comments/like";
import { unLikeComment } from "@/actions/comments/unlike";

type CommentActionsProps = {
  data: Comment;
  sessionId: string | undefined;
};

const CommentActions = ({ data, sessionId }: CommentActionsProps) => {
  const pathname = usePathname();
  const hasLiked = !!data.likes.find((id) => id === sessionId);

  const toggleLike = async () => {
    if (hasLiked) {
      await unLikeComment({
        commentId: data.id,
        path: pathname,
      });
    } else {
      await likeComment({
        commentId: data.id,
        path: pathname,
      });
    }
  };
  return (
    <div className="flex items-center space-x-20">
      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-full hover:bg-sky-100 hover:text-sky-600 peer cursor-pointer transition">
          <BiMessageRounded className="h-5 w-5" />
        </div>
        <span className="peer-hover:text-sky-600 transition">0</span>
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="p-2 rounded-full hover:bg-red-50 hover:text-red-500 peer cursor-pointer transition"
          onClick={toggleLike}
        >
          {hasLiked ? (
            <AiFillHeart className="h-5 w-5 text-red-500" />
          ) : (
            <AiOutlineHeart className="h-5 w-5" />
          )}
        </div>
        <span className="peer-hover:text-red-500 transition">
          {data.likes.length}
        </span>
      </div>
    </div>
  );
};

export default CommentActions;
