"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type HeaderProps = {
  label: string;
  postCount?: string;
  showBackArrow?: boolean;
};

const Header = ({ label, postCount, showBackArrow }: HeaderProps) => {
  const router = useRouter();

  const onBackNavigation = () => {
    router.back();
  };

  return (
    <div className="sticky top-0 bg-white/80 backdrop-blur-3xl z-10">
      <div className="h-14 flex items-center">
        <div className="flex justify-between items-center gap-10 px-5">
          {showBackArrow && (
            <div
              onClick={onBackNavigation}
              className="flex p-2 rounded-full hover:bg-neutral-200 transition cursor-pointer"
            >
              <ArrowLeft />
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-lg font-semibold">{label}</p>
            {postCount && (
              <div className="text-xs text-neutral-600 font-medium">
                <span>{postCount}</span>
                <span className="ml-1">
                  {postCount.length > 1 ? "posts" : "post"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
