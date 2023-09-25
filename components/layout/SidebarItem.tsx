"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import { RiHome7Fill, RiHome7Line } from "react-icons/ri";
import { TbBellFilled, TbBell } from "react-icons/tb";
import { FiMoreHorizontal } from "react-icons/fi";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import Avatar from "../Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type SidebarItemProps = {
  sessionUsername: string | undefined;
  sessionName: string | null | undefined;
  sessionImage: string | null | undefined;
};

const SidebarItem = ({
  sessionUsername,
  sessionName,
  sessionImage,
}: SidebarItemProps) => {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen w-full">
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col space-y-2 items-start">
          <Link
            href="/home"
            className="hover:bg-neutral-200 rounded-full p-3 transition"
          >
            <div className="flex items-center gap-3">
              {pathname === "/home" ? (
                <RiHome7Fill className="h-7 w-7" />
              ) : (
                <RiHome7Line className="h-7 w-7" />
              )}
              <span
                className={cn(
                  "text-xl hidden md:block",
                  pathname === "/home" ? "font-semibold" : "font-normal"
                )}
              >
                Home
              </span>
            </div>
          </Link>
          <Link
            href="/notifications"
            className="hover:bg-neutral-200 rounded-full p-3 transition"
          >
            <div className="flex items-center gap-3">
              {pathname === "/notifications" ? (
                <TbBellFilled className="h-7 w-7" />
              ) : (
                <TbBell className="h-7 w-7" />
              )}
              <span
                className={cn(
                  "text-xl hidden md:block",
                  pathname === "/notifications"
                    ? "font-semibold"
                    : "font-normal"
                )}
              >
                Notifications
              </span>
            </div>
          </Link>
          <Link
            href={`/${sessionUsername}`}
            className="hover:bg-neutral-200 rounded-full p-3 transition"
          >
            <div className="flex items-center gap-3">
              {pathname === `/${sessionUsername}` ? (
                <HiUser className="h-7 w-7" />
              ) : (
                <HiOutlineUser className="h-7 w-7" />
              )}
              <span
                className={cn(
                  "text-xl hidden md:block",
                  pathname === `/${sessionUsername}`
                    ? "font-semibold"
                    : "font-normal"
                )}
              >
                Profile
              </span>
            </div>
          </Link>
        </div>
        <div className="absolute bottom-16 left-0 flex items-start">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex flex-nowrap items-center justify-center gap-2 md:w-[250px] p-1.5 md:py-3 hover:bg-neutral-200 rounded-full cursor-pointer transition">
                <Avatar src={sessionImage!} />
                <div className="hidden md:flex md:flex-col">
                  <p className="text-sm font-semibold">{sessionName}</p>
                  <p className="text-sm text-neutral-500">@{sessionUsername}</p>
                </div>
                <FiMoreHorizontal className="hidden md:flex" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 m-0 h-20 flex items-center rounded-md">
              <div
                className="cursor-pointer hover:bg-neutral-100 w-full py-3"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <p className="px-6 text-lg font-medium">
                  Log out @{sessionUsername}
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default SidebarItem;
