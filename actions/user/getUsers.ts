"use server";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function getUsers() {
  try {
    const session = await getAuthSession();

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: {
            equals: session?.user.id,
          },
        },
      },
      take: 5,
    });

    return users;
  } catch (error) {}
}
