import dayjs from "dayjs";
import { useMemo } from "react";
import { Comment, User } from "@prisma/client";
import relativeTime from "dayjs/plugin/relativeTime";

import Avatar from "../Avatar";
import FeedImages from "../FeedImages";
import CommentActions from "./CommentActions";
import { getAuthSession } from "@/lib/auth";
import AlertModal from "../AlertModal";
import DeleteCommentModal from "./DeleteCommentModal";

type CommentFeedProps = {
  comment: Comment & {
    creator: User;
  };
};

const CommentFeed = async ({ comment }: CommentFeedProps) => {
  const session = await getAuthSession();
  dayjs.extend(relativeTime);
  const createdAt = dayjs(comment.createdAt).fromNow(true);

  return (
    <div className="border-b px-6 py-2">
      <div className="flex items-start space-x-3 py-3">
        <Avatar src={comment.creator.profileImage!} />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <p className="font-semibold">{comment.creator.name}</p>
              <p className="text-neutral-600">@{comment.creator.username}</p>
              <p className="text-neutral-600">{createdAt}</p>
            </div>
            {comment.creator.id === session?.user.id && (
              <DeleteCommentModal commentId={comment.id} />
            )}
          </div>
          <div className="mt-2">
            <p className="text-neutral-700">{comment.body}</p>
          </div>
          <FeedImages data={comment.images} />
          <div className="mt-3">
            <CommentActions data={comment} sessionId={session?.user.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentFeed;
