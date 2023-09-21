import { HomeIcon, User } from "lucide-react";
import Link from "next/link";

type SidebarItemProps = {
  sessionUsername: string | undefined;
};

const SidebarItem = ({ sessionUsername }: SidebarItemProps) => {
  const routes = [
    {
      label: "Home",
      href: "/home",
      icon: <HomeIcon size={28} />,
    },
    {
      label: "Profile",
      href: `/${sessionUsername}`,
      icon: <User size={28} />,
    },
  ];

  return (
    <div className="flex flex-col space-y-2">
      {/* <div className="relative flex items-center gap-4 rounded-full hover:bg-neutral-200"> */}
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className="relative p-3 ml-1 md:ml-0 flex items-center gap-4 rounded-full hover:bg-neutral-200"
        >
          {route.icon}
          <span className="hidden md:block text-xl">{route.label}</span>
        </Link>
      ))}
    </div>
    // </div>
  );
};

export default SidebarItem;
