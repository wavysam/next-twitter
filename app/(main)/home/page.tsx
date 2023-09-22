import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import Header from "@/components/Header";
import Avatar from "@/components/Avatar";
import PostForm from "./_components/PostForm";

const Page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div>
      <Header label="Home" />
      <div className="border-b">
        <div className="flex items-start p-3 space-x-3">
          <Avatar src={session.user.image!} />
          <div className="flex-1">
            <PostForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
