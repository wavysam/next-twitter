"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type DeleteCommentProps = {
  commentId: string;
  path: string;
};

export async function deleteComment({ commentId, path }: DeleteCommentProps) {
  try {
    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    revalidatePath(path);
  } catch (error) {}
}
