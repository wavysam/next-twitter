import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();
    const url = new URL(request.url);
    const postId = url.searchParams.get("postId") as string;

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

    const postLikes = [...(post.likes || [])];
    const updatedLikes = postLikes.filter((id) => id !== session.user.id);

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: updatedLikes,
      },
    });

    return Response.json(updatedPost, { status: 200 });
  } catch (error) {
    return new Response("Internal error", { status: 500 });
  }
}
