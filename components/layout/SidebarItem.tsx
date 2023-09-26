"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

type SidebarItemProps = {
  label: string;
  href: string;
  icon: IconType;
  activeIcon: IconType;
};

const SidebarItem = ({
  label,
  href,
  icon: Icon,
  activeIcon: ActiveIcon,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <div className="relative h-full w-full">
      <div className="flex flex-col items-start space-y-2">
        <Link
          href={href}
          className="flex items-center space-x-3 justify-start p-3 hover:bg-neutral-200 rounded-full transition"
        >
          {isActive ? (
            <ActiveIcon className="h-7 w-7" />
          ) : (
            <Icon className="h-7 w-7" />
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
