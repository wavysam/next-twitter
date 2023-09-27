"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type DeletePostProps = {
  postId: string;
  path: string;
};

export default async function deletePost({ postId, path }: DeletePostProps) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    revalidatePath(path);
  } catch (error) {}
}
