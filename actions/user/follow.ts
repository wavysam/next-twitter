"use server";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function follow(userId: string, path: string) {
  try {
    const session = await getAuthSession();
    const followingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const currentUser = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });

    const followingUserFollowers = [...(followingUser?.followers || [])];
    followingUserFollowers.push(session?.user.id as string);

    const currentUserFollowing = [...(currentUser?.following || [])];
    currentUserFollowing.push(followingUser?.id as string);

    await Promise.allSettled([
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followers: followingUserFollowers,
        },
      }),
      await prisma.user.update({
        where: {
          id: session?.user.id,
        },
        data: {
          following: currentUserFollowing,
        },
      }),
    ]);

    revalidatePath(path);
  } catch (error) {}
}

export async function unfollow(userId: string, path: string) {
  try {
    const session = await getAuthSession();
    const followingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const currentUser = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });

    const followingUserFollowers = [...(followingUser?.followers || [])];
    const updatedFollowingUserFollowers = followingUserFollowers.filter(
      (id) => id !== session?.user.id
    );

    const currentUserFollowing = [...(currentUser?.following || [])];
    const updatedCurrentUserFollowing = currentUserFollowing.filter(
      (id) => id !== followingUser?.id
    );

    await Promise.allSettled([
      // following user
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followers: updatedFollowingUserFollowers,
        },
      }),
      // current user
      await prisma.user.update({
        where: {
          id: session?.user.id,
        },
        data: {
          following: updatedCurrentUserFollowing,
        },
      }),
    ]);

    revalidatePath(path);
  } catch (error) {}
}
