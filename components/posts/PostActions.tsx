"use client";

import { startTransition, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import { Post, User } from "@prisma/client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import Avatar from "../Avatar";
import CommentForm from "../CommentForm";

type PostActionsProps = {
  data: Post & {
    creator: User;
  };
  sessionImage: string;
  sessionId: string;
};

const PostActions = ({ data, sessionImage, sessionId }: PostActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const hasLiked = !!data.likes.find((id) => id === sessionId);

  const { mutate: toggleLike } = useMutation({
    mutationFn: async () => {
      if (hasLiked) {
        const { data: responseData } = await axios.put(
          `/api/post/unlike?postId=${data.id}`
        );
        return responseData;
      } else {
        const { data: responseData } = await axios.put(
          `/api/post/like?postId=${data.id}`
        );
        return responseData;
      }
    },
    onSuccess: () => {
      startTransition(() => router.refresh());
    },
  });

  return (
    <div className="flex items-center space-x-20">
      <div className="flex items-center space-x-2">
        <AlertDialog open={isOpen}>
          <AlertDialogTrigger asChild>
            <div className="flex items-center space-x-2">
              <div
                className="p-2 rounded-full hover:bg-sky-100 peer hover:text-sky-600 peer transition"
                onClick={() => setIsOpen(true)}
              >
                <BiMessageRounded className="h-5 w-5" />
              </div>
              <p className="peer-hover:text-sky-600">0</p>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-xl">
            <div className="flex">
              <AlertDialogCancel
                className="border-none aspect-square p-1 rounded-full hover:bg-neutral-200 transition cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </AlertDialogCancel>
            </div>
            <div className="flex items-start space-x-3 mt-4">
              <Avatar src={data.creator.profileImage as string} />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold">{data.creator.name}</p>
                  <p className="text-neutral-500">@{data.creator.username}</p>
                </div>
                <div className="mt-2">
                  <p className="whitespace-pre-line">{data.body}</p>
                </div>
                <div className="mt-3">
                  <p className="text-neutral-500 text-sm">
                    Replying to
                    <span className="text-sky-500 ml-1">
                      @{data.creator.username}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 my-4">
              <Avatar src={sessionImage} />
              <div className="flex-1">
                <CommentForm postId={data.id} stateAction={setIsOpen} />
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="p-2 rounded-full hover:bg-red-100 peer hover:text-red-500 peer transition"
          onClick={() => toggleLike()}
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
