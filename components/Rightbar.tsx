import getUsers from "@/actions/user/getUsers";
import IndividualUser from "./IndividualUser";
import { getAuthSession } from "@/lib/auth";

const Rightbar = async () => {
  const users = await getUsers();
  const session = await getAuthSession();
  return (
    <div className="relative p-5 w-full">
      <div className="bg-neutral-100 p-4 rounded-lg w-full">
        <h1 className="text-xl font-bold">Who to follow</h1>
        <div className="flex flex-col gap-y-6 mt-6">
          {users?.map((user) => (
            <IndividualUser
              key={user.id}
              data={user}
              sessionId={session?.user.id!}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
