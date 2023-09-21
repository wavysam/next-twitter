import { getAuthSession } from "@/lib/auth";
import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";

const SideBar = async () => {
  const session = await getAuthSession();

  return (
    <aside className="h-full md:pr-4">
      <div className="flex flex-col items-end">
        <div className="space-y-2">
          <div className="flex justify-start">
            <SidebarLogo />
          </div>
          <SidebarItem sessionUsername={session?.user.username} />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
