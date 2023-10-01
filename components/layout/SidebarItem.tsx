"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { IconType } from "react-icons";
import { GoDotFill } from "react-icons/go";

type SidebarItemProps = {
  label: string;
  href: string;
  icon: IconType;
  activeIcon: IconType;
  alert?: boolean | null;
};

const SidebarItem = ({
  label,
  href,
  icon: Icon,
  activeIcon: ActiveIcon,
  alert,
}: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  useEffect(() => {
    if (pathname === "/notifications") {
      router.refresh();
    }
  }, [pathname, router]);

  return (
    <div className="relative h-full w-full">
      <div className="flex flex-col items-start space-y-2">
        <Link
          href={href}
          className="flex items-center space-x-3 justify-start p-3 hover:bg-neutral-200 rounded-full transition"
        >
          {isActive ? (
            <div className="relative">
              <ActiveIcon className="h-7 w-7" />
            </div>
          ) : (
            <div className="relative">
              {alert ? (
                <div className="absolute top-0 right-0">
                  <GoDotFill className="h-4 w-4 text-sky-500" />
                </div>
              ) : null}
              <Icon className="h-7 w-7" />
            </div>
          )}

          <span
            className={cn(
              "hidden md:flex text-xl",
              isActive ? "font-semibold" : "font-normal"
            )}
          >
            {label}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SidebarItem;
