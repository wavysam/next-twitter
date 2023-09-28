import { Comment, Post, User } from "@prisma/client";

export type ExtendedPost = Post & {
  creator: User;
  comments: Comment[];
};
