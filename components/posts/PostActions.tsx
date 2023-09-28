"use client";

import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { Post, User } from "@prisma/client";
import { likePost, unlikePost } from "@/actions/posts/like";

type PostActionsProps = {
  data:
    | (Post & {
        creator: User;
        comments: Comment[];
      })
    | any;
  sessionImage: string;
  sessionId: string;
};

const PostActions = ({ data, sessionImage, sessionId }: PostActionsProps) => {
  const pathname = usePathname();

  const hasLiked = !!data.likes.find((id: string) => id === sessionId);

  const toggleLike = async () => {
    if (hasLiked) {
      await unlikePost({ postId: data.id, path: pathname });
    } else {
      await likePost({ postId: data.id, path: pathname });
    }
  };

  return (
    <div className="flex items-center space-x-20">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Link
            href={`/${data.creator.username}/status/${data.id}`}
            className="p-2 rounded-full hover:bg-sky-100 peer hover:text-sky-600 peer transition"
          >
            <BiMessageRounded className="h-5 w-5" />
          </Link>
          <p className="peer-hover:text-sky-600">{data.comments.length}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 cursor-pointer">
        <div
          className="p-2 rounded-full hover:bg-red-100 peer hover:text-red-500 peer transition"
          onClick={toggleLike}
        >
          {hasLiked ? (
            <AiFillHeart className="h-5 w-5 text-red-500" />
          ) : (
            <AiOutlineHeart className="h-5 w-5" />
          )}
        </div>
        <p className="peer-hover:text-red-500">{data.likes.length}</p>
      </div>
    </div>
  );
};

export default PostActions;
