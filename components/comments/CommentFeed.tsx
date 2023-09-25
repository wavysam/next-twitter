import { Comment, User } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Avatar from "../Avatar";
import { useMemo } from "react";
import FeedImages from "../FeedImages";

type CommentFeedProps = {
  comment: Comment & {
    creator: User;
  };
};

const CommentFeed = async ({ comment }: CommentFeedProps) => {
  dayjs.extend(relativeTime);
  const createdAt = useMemo(() => {
    return dayjs(comment.createdAt).fromNow(true);
  }, [comment.createdAt]);

  return (
    <div className="border-b p-6">
      <div className="flex items-start space-x-3 py-3">
        <Avatar src={comment.creator.profileImage!} />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <p className="font-semibold">{comment.creator.name}</p>
            <p className="text-neutral-600">@{comment.creator.username}</p>
            <p className="text-neutral-600">{createdAt}</p>
          </div>
          <div className="mt-2">
            <p className="text-neutral-700">{comment.body}</p>
          </div>
          <FeedImages data={comment.images} />
        </div>
      </div>
    </div>
  );
};

export default CommentFeed;
