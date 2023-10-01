"use server";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteAllNotifications = async () => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const notifications = await prisma.notification.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    revalidatePath("/notifications");

    return notifications;
  } catch (error) {}
};
