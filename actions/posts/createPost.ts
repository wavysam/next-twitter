"use server";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreatePostProps = {
  body: string;
  images?: string[];
  path: string;
};

export default async function createPost({
  body,
  images,
  path,
}: CreatePostProps) {
  try {
    const session = await getAuthSession();

    const post = await prisma.post.create({
      data: {
        body,
        images: images || undefined,
        creatorId: session?.user.id as string,
      },
    });

    revalidatePath(path);

    return post;
  } catch (error) {
    throw new Error("Failed to create post");
  }
}
