import { getAuthSession } from "@/lib/auth";
import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";

const SideBar = async () => {
  const session = await getAuthSession();

  return (
    <aside className="relative h-full md:ml-12">
      <div className="flex flex-col items-start">
        <div className="space-y-2">
          <div className="flex justify-start">
            <SidebarLogo />
          </div>
          <SidebarItem
            sessionUsername={session?.user.username}
            sessionName={session?.user.name}
            sessionImage={session?.user.image}
          />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
