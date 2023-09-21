"use client";

import { X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useEditProfileModal from "@/hooks/useEditProfileModal";
import EditProfileForm from "./EditProfileForm";
import { User } from "@prisma/client";

type EditProfileModalProps = {
  initialData: User | null;
};

const EditProfileModal = ({ initialData }: EditProfileModalProps) => {
  const editProfileModal = useEditProfileModal();

  const onOpenModal = () => {
    editProfileModal.onOpen();
  };

  const onCloseModal = () => {
    editProfileModal.onClose();
  };

  return (
    <>
      <AlertDialog open={editProfileModal.isOpen}>
        <AlertDialogTrigger asChild>
          <div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-6"
              onClick={onOpenModal}
            >
              Edit Profile
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-xl">
          <div className="flex items-center gap-6">
            <div
              className="hover:bg-neutral-200 p-2 rounded-full cursor-pointer transition"
              onClick={onCloseModal}
            >
              <X />
            </div>
            <h3 className="text-xl font-semibold">Edit profile</h3>
          </div>
          <div>
            <EditProfileForm
              userId={initialData?.id}
              name={initialData?.name}
              bio={initialData?.bio}
              coverImage={initialData?.coverImage}
              profileImage={initialData?.profileImage}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditProfileModal;
