"use client";

import { X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useRegisterModal from "@/hooks/useRegisterModal";
import RegisterForm from "./register-form";

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  const onOpenModal = () => {
    registerModal.onOpen();
  };

  const onCloseModal = () => {
    registerModal.onClose();
  };

  return (
    <>
      <AlertDialog open={registerModal.isOpen}>
        <AlertDialogTrigger asChild className="p-0">
          <div>
            <Button
              size="lg"
              className="rounded-full w-[300px]"
              onClick={onOpenModal}
            >
              Create Account
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-xl">
          <div
            className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-neutral-200 transition cursor-pointer"
            onClick={onCloseModal}
          >
            <X />
          </div>
          <div className="px-10">
            <div className="flex items-start justify-start">
              <h3 className="text-2xl font-bold">Create your account</h3>
            </div>
            <div className="mt-6">
              <RegisterForm />
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RegisterModal;
