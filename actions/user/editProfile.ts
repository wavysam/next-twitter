"use server";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as z from "zod";

type UpdateProfileProps = {
  name: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;

  path: string;
};

export const updateProfile = async ({
  name,
  bio,
  coverImage,
  profileImage,
  path,
}: UpdateProfileProps) => {
  try {
    const session = await getAuthSession();

    const schema = z.object({
      name: z.string().nonempty(),
      bio: z.string().optional(),
      coverImage: z.string().optional(),
      profileImage: z.string().optional(),
    });

    const user = await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        name,
        bio,
        coverImage,
        profileImage,
      },
    });

    revalidatePath(path);
  } catch (error) {}
};
