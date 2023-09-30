"use server";

import prisma from "@/lib/prisma";
import { ExtendedPost } from "@/lib/types";

export default async function fetchPosts(userId?: string) {
  try {
    // await delay(3000);
    let posts;
    if (userId && userId !== undefined) {
      posts = await prisma.post.findMany({
        where: {
          creatorId: userId,
        },
        include: {
          creator: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          creator: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return posts as ExtendedPost[];
  } catch (error) {}
}
