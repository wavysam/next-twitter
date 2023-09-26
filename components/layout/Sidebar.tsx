"use client";

import { RiHome7Fill, RiHome7Line } from "react-icons/ri";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import { TbBell, TbBellFilled } from "react-icons/tb";
import { Session } from "next-auth";

import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";

type SidebarProps = {
  session: Session | null;
};

const SideBar = ({ session }: SidebarProps) => {
  return (
    <div className="relative h-full w-full">
      <div className="flex flex-col items-start space-y-2">
        <SidebarLogo />
        <SidebarItem
          label="Home"
          href="/home"
          icon={RiHome7Line}
          activeIcon={RiHome7Fill}
        />
        <SidebarItem
          label="Notifications"
          href="/notifications"
          icon={TbBell}
          activeIcon={TbBellFilled}
        />
        <SidebarItem
          label="Profile"
          href={`/${session?.user.username}`}
          icon={HiOutlineUser}
          activeIcon={HiUser}
        />
      </div>
    </div>
  );
};

export default SideBar;
