"use server";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreateCommentProps = {
  postId: string;
  body: string;
  images: string[];
  path: string;
};

export default async function createComment({
  postId,
  body,
  images,
  path,
}: CreateCommentProps) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        images,
        postId,
        creatorId: session.user.id,
      },
    });

    if (post.creatorId && post.creatorId !== session.user.id) {
      await prisma.notification.create({
        data: {
          body: "Someone replied in your tweet",
          userId: post.creatorId,
        },
      });

      await prisma.user.update({
        where: {
          id: post.creatorId,
        },
        data: {
          hasNotication: true,
        },
      });
    }

    revalidatePath(path);

    return comment;
  } catch (error) {
    throw new Error("Failed to create comment");
  }
}
