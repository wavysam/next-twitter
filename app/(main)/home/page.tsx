import { redirect } from "next/navigation";

import { Suspense } from "react";
import { getAuthSession } from "@/lib/auth";
import Header from "@/components/Header";
import Avatar from "@/components/Avatar";
import PostForm from "./_components/PostForm";
import prisma from "@/lib/prisma";
import PostFeed from "@/components/posts/PostFeed";
import fetchPosts from "@/actions/posts/fetchPosts";
import Loader from "@/components/Loader";
import { trpc } from "@/app/_trpc/client";

const Page = async () => {
  const session = await getAuthSession();

  const posts = await fetchPosts();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div>
      <Header label="Home" />
      <div className="border-b">
        <div className="flex items-start p-3 space-x-3">
          <Avatar src={session?.user.image!} />
          <div className="flex-1">
            <PostForm />
          </div>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <PostFeed data={posts} />
      </Suspense>
    </div>
  );
};

export default Page;
