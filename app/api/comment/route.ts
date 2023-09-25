import * as z from "zod";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreatePostValidatorSchema } from "@/lib/validator/createPostValidator";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    const requestBody = await request.json();
    const { images, postId } = requestBody;
    const { body } = CreatePostValidatorSchema.parse(requestBody);

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        images,
        postId,
        creatorId: session.user.id,
      },
    });

    return Response.json(comment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid field values", { status: 409 });
    }

    return new Response("Internal error", { status: 500 });
  }
}
