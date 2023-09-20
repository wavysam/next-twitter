"use client";

import { X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useLoginModal from "@/hooks/useLoginModal";
import LoginForm from "./login-form";

const LoginModal = () => {
  const loginModal = useLoginModal();

  const onOpenModal = () => {
    loginModal.onOpen();
  };

  const onCloseModal = () => {
    loginModal.onClose();
  };
  return (
    <>
      <AlertDialog open={loginModal.isOpen}>
        <AlertDialogTrigger asChild>
          <div>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-[300px]"
              onClick={onOpenModal}
            >
              Sign in
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-xl">
          <div
            className="h-9 w-9 flex justify-center items-center hover:bg-neutral-200 rounded-full cursor-pointer transition"
            onClick={onCloseModal}
          >
            <X />
          </div>
          <div className="px-12">
            <h3 className="text-2xl font-bold">Sign in to X</h3>

            <div className="mt-6">
              <LoginForm />
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LoginModal;
