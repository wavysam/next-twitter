"use server";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getNotifications() {
  try {
    const session = await getAuthSession();
    const notifications = await prisma.notification.findMany({
      where: {
        userId: session?.user.id,
      },
      orderBy: {
        createdtAt: "desc",
      },
    });

    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        hasNotication: false,
      },
    });

    return notifications;
  } catch (error) {}
}
