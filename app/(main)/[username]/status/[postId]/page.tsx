import dayjs from "dayjs";
import Image from "next/image";
import prisma from "@/lib/prisma";

import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Avatar from "@/components/Avatar";
import { getAuthSession } from "@/lib/auth";
import ClientOnly from "@/components/ClientOnly";
import CommentForm from "@/components/CommentForm";
import CommentFeed from "@/components/comments/CommentFeed";
import PostActions from "@/components/posts/PostActions";

type PageProps = {
  params: {
    username: string;
    postId: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const session = await getAuthSession();

  const [post, comments] = await Promise.all([
    await prisma.post.findUnique({
      where: {
        id: params.postId,
      },
      include: {
        creator: true,
        comments: true,
      },
    }),
    await prisma.comment.findMany({
      where: {
        postId: params.postId,
      },
      include: {
        creator: true,
        post: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const createdAt = dayjs(post?.createdAt).format("hh:mm A MMM DD, YYYY");
  return (
    <div className="mb-10">
      <div className="border-b">
        <Header label="Post" showBackArrow />
        <div className="md:flex">
          <div className="px-6 pt-6 pb-0 w-full">
            <div className="flex items-center space-x-3">
              <Avatar src={post?.creator.profileImage!} />
              <div className="flex flex-col">
                <p className="font-semibold">{post?.creator.name}</p>
                <p className="text-neutral-600">@{post?.creator.username}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-neutral-700 whitespace-pre-line">
                {post?.body}
              </p>
            </div>

            <div
              className={cn(
                "grid gap-1",
                post?.images && "mt-2",
                post?.images.length === 1 ? "grid-cols-1" : "grid-cols-2",
                post?.images.length! >= 3 && "grid-cols-3"
              )}
            >
              {post?.images &&
                post.images.map((image) => (
                  <div
                    key={image}
                    className={cn(
                      "relative",
                      post.images.length === 1 ? "aspect-[4/3]" : "aspect-[2/3]"
                    )}
                  >
                    <Image
                      src={image}
                      alt="Post image"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                ))}
            </div>

            <div className="py-4 flex flex-row items-center space-x-3 border-b">
              <p className="text-neutral-500 text-[15px] font-medium">
                {createdAt}
              </p>
            </div>

            <div className="border-b py-2">
              <PostActions data={post} sessionId={session?.user.id as string} />
            </div>

            <ClientOnly>
              <div className="flex items-start space-x-3 py-4">
                <Avatar src={session?.user.image!} />
                <div className="flex-1">
                  <CommentForm postId={post?.id!} />
                </div>
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>

      <div>
        {comments.map((comment) => (
          <CommentFeed key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Page;
