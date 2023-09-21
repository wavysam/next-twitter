import * as z from "zod";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { EditProfileValidatorSchema } from "@/lib/validator/editProfileValidator";

export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId") as string;
    const body = await request.json();

    const { name, bio, coverImage, profileImage } =
      EditProfileValidatorSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        bio,
        coverImage,
        profileImage,
      },
    });

    return Response.json(updatedUser, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid field values", { status: 409 });
    }

    return new Response("Internal Error", { status: 500 });
  }
}
