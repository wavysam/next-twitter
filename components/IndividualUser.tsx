"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";

import Avatar from "./Avatar";
import { Button } from "./ui/button";
import { follow, unfollow } from "@/actions/user/follow";

type IndividualUserProps = {
  data: User;
  sessionId: string;
};

const IndividualUser = ({ data, sessionId }: IndividualUserProps) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const hasFollow = !!data.followers.find((id) => id === sessionId);

  const handleFollow = async () => {
    setLoading(true);
    try {
      await follow(data.id, pathname);
    } finally {
      setLoading(false);
    }
  };
  const handleUnfollow = async () => {
    setLoading(true);
    try {
      await unfollow(data.id, pathname);
    } finally {
      setLoading(false);
    }
  };
  const toggleFollow = async () => {
    hasFollow ? handleUnfollow() : handleFollow();
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-start gap-3">
        <Avatar src={data.profileImage!} />
        <div className="flex flex-col">
          <Link
            href={`/${data.username}`}
            className="hover:underline font-semibold"
          >
            {data.name}
          </Link>
          <p className="text-sm text-neutral-600">@{data.username}</p>
        </div>
      </div>
      <Button
        size="sm"
        variant={hasFollow ? "outline" : "default"}
        disabled={loading}
        onClick={toggleFollow}
        className="rounded-full w-[100px]"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : hasFollow ? (
          "Following"
        ) : (
          "Follow"
        )}
      </Button>
    </div>
  );
};

export default IndividualUser;
