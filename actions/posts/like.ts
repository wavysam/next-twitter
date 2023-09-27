"use server";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type LikeProps = {
  postId: string;
  path: string;
};

export async function likePost({ postId, path }: LikeProps) {
  try {
    const session = await getAuthSession();

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    const postLikes = [...(post?.likes || [])];
    postLikes.push(session?.user.id as string);

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: postLikes,
      },
    });

    revalidatePath(path);
  } catch (error) {}
}

export async function unlikePost({ postId, path }: LikeProps) {
  try {
    const session = await getAuthSession();

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    const postLikes = [...(post?.likes || [])];
    const updatedLikes = postLikes.filter((id) => id !== session?.user.id);

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: updatedLikes,
      },
    });

    revalidatePath(path);
  } catch (error) {}
}
