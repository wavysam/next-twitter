import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";

const Page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return <div>Homepage</div>;
};

export default Page;
