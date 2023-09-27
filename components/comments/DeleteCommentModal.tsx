"use client";

import { Check, Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { deleteComment } from "@/actions/comments/deleteComment";
import { usePathname } from "next/navigation";
import { useState } from "react";

type DeleteModalProps = {
  commentId: string;
};

const DeleteCommentModal = ({ commentId }: DeleteModalProps) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const onDeleteComment = async () => {
    setLoading(true);
    try {
      await deleteComment({ commentId, path: pathname });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="p-2 hover:bg-red-50 rounded-full cursor-pointer transition">
          <Trash2 className="h-4 w-4 text-red-500" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-8 max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-semibold">
            Delete comment?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            This can&apos;t be undone and it will be removed from your profile,
            and the timeline of any accounts that follow you.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col space-y-2">
          <Button
            variant="destructive"
            className="w-full rounded-full"
            disabled={loading}
            onClick={onDeleteComment}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Delete"}
          </Button>
          <AlertDialogCancel className="w-full rounded-full">
            Cancel
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCommentModal;
