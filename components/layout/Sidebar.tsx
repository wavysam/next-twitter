"use client";

import { RiHome7Fill, RiHome7Line } from "react-icons/ri";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import { TbBell, TbBellFilled } from "react-icons/tb";
import { Session } from "next-auth";

import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Avatar from "../Avatar";
import { LogOut, MoreHorizontal } from "lucide-react";
import { signOut } from "next-auth/react";

type SidebarProps = {
  session: Session | null;
};

const SideBar = ({ session }: SidebarProps) => {
  return (
    <div className="relative h-full w-full">
      <div className="flex flex-col justify-between md:w-[275px] h-screen">
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
        <div className="mb-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-between gap-3 p-1.5 md:p-2 hover:bg-neutral-200 rounded-full transition-all cursor-pointer">
                <Avatar src={session?.user.image!} />
                <div className="flex-1 flex-col hidden md:flex">
                  <p className="font-semibold">{session?.user.name}</p>
                  <p className="text-neutral-600 text-sm">
                    @{session?.user.username}
                  </p>
                </div>
                <div className="hidden md:flex">
                  <MoreHorizontal />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[275px]">
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="cursor-pointer"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span className="text-[17px] font-medium">
                  Log out @{session?.user.username}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
