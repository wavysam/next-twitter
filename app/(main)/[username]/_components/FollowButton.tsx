"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { User } from "@prisma/client";
import { Loader2 } from "lucide-react";

import { follow, unfollow } from "@/actions/user/follow";
import { Button } from "@/components/ui/button";

type FollowButtonProps = {
  userId: string;
  data: User | null;
  sessionId: string;
};

const FollowButton = ({ userId, data, sessionId }: FollowButtonProps) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const hasFollow = !!data?.followers.find((id) => id === sessionId);

  const handleFollow = async () => {
    setLoading(true);
    try {
      await follow(userId, pathname);
    } finally {
      setLoading(false);
    }
  };
  const handleUnfollow = async () => {
    setLoading(true);
    try {
      await unfollow(userId, pathname);
    } finally {
      setLoading(false);
    }
  };
  const toggleFollow = async () => {
    hasFollow ? handleUnfollow() : handleFollow();
  };
  return (
    <div>
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

export default FollowButton;
