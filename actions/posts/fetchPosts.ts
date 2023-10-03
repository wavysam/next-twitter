"use server";

import prisma from "@/lib/prisma";

type FetchPostsProps = {
  page?: number;
  userId?: string;
};

export default async function fetchPosts({
  page = 1,
  userId,
}: FetchPostsProps) {
  try {
    const limit = 10;
    const skip = (page - 1) * limit;
    let posts;

    if (userId) {
      posts = await prisma.post.findMany({
        where: {
          creatorId: userId,
        },
        include: {
          creator: true,
          comments: true,
        },
        take: limit,
        skip,
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
        take: limit,
        skip,
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return posts;
  } catch (error: any) {
    throw new Error("Failed to fetch posts", error.message);
  }
}
