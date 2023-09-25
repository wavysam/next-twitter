"use client";

import { Check, Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

type AlertModalProps = {
  onConfirm: () => void;
  disabled?: boolean;
  isSuccess?: boolean;
};

const AlertModal = ({ onConfirm, disabled, isSuccess }: AlertModalProps) => {
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
            Delete post?
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
            disabled={disabled}
            onClick={onConfirm}
          >
            {isSuccess && <Check className="h-5 w-5" />}
            {disabled && <Loader2 className="h-5 w-5 animate-spin" />}
            {!disabled && !isSuccess && "Delete"}
          </Button>
          <AlertDialogCancel className="w-full rounded-full">
            Cancel
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
