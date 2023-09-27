"use server";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type LikeCommentProps = {
  postId?: string;
  commentId: string;
  path: string;
};

export async function likeComment({
  postId,
  commentId,
  path,
}: LikeCommentProps) {
  try {
    const session = await getAuthSession();

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    const commentLikes = [...(comment?.likes || [])];
    commentLikes.push(session?.user.id as string);

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        likes: commentLikes,
      },
    });

    revalidatePath(path);

    return updatedComment;
  } catch (error) {}
}
