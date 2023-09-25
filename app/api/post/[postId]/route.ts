import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getAuthSession();
    const { postId } = params;

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

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return new Response("Post deleted", { status: 200 });
  } catch (error) {
    return new Response("Internal error", { status: 500 });
  }
}
