import Image from "next/image";
import { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";
import { getAuthSession } from "@/lib/auth";
import PostFeed from "@/components/posts/PostFeed";
import ProfileInfo from "./_components/ProfileInfo";
import FollowButton from "./_components/FollowButton";
import EditProfileModal from "./_components/EditProfileModal";

type PageProps = {
  params: {
    username: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { username } = params;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return {
    title: `${user?.name} (@${user?.username})`,
  };
}

const Page = async ({ params }: PageProps) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const paramsUser = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  });

  const userPosts = await prisma.post.findMany({
    where: {
      creatorId: paramsUser?.id,
    },
    include: {
      creator: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <Header
        label={paramsUser?.name!}
        showBackArrow
        postCount={userPosts.length.toString()}
      />
      <div className="relative">
        <div className="h-52 bg-neutral-200 relative">
          {paramsUser?.coverImage && (
            <Image
              src={paramsUser.coverImage}
              alt="Cover image"
              fill
              className="object-cover"
            />
          )}

          <div className="absolute -bottom-16 left-4">
            <Avatar src={paramsUser?.profileImage!} isLarge isBordered />
          </div>
        </div>

        <div className="mt-3 border-b pb-6">
          <div className="px-6">
            <div className="flex justify-end">
              {session.user.username === params.username ? (
                <EditProfileModal initialData={paramsUser} />
              ) : (
                <FollowButton
                  userId={paramsUser?.id!}
                  data={paramsUser}
                  sessionId={session.user.id}
                />
              )}
            </div>
            <div>
              <ProfileInfo
                name={paramsUser?.name}
                username={paramsUser?.username}
                bio={paramsUser?.bio}
                createdAt={paramsUser?.createdAt}
                followers={paramsUser?.followers}
                following={paramsUser?.following}
              />
            </div>
          </div>
        </div>

        <Suspense fallback={<Loader />}>
          <PostFeed data={userPosts} session={session} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
