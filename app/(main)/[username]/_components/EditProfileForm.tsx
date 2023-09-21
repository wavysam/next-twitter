"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  EditProfileValidatorSchema,
  EditProfileValidatorType,
} from "@/lib/validator/editProfileValidator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import useEditProfileModal from "@/hooks/useEditProfileModal";

type EditProfileFormProps = {
  userId: string | undefined;
  name: string | undefined;
  bio: string | null | undefined;
  coverImage: string | null | undefined;
  profileImage: string | null | undefined;
};

const EditProfileForm = ({
  userId,
  name,
  bio,
  coverImage,
  profileImage,
}: EditProfileFormProps) => {
  const [coverImageHolder, setCoverImageHolder] = useState<File[]>([]);
  const [profileImageHolder, setProfileImageHolder] = useState<File[]>([]);

  const { startUpload } = useUploadThing("imageUploader");
  const editProfileModal = useEditProfileModal();
  const router = useRouter();

  const form = useForm<EditProfileValidatorType>({
    resolver: zodResolver(EditProfileValidatorSchema),
    defaultValues: {
      name: name || "",
      bio: bio || "",
      coverImage: coverImage || "",
      profileImage: profileImage || "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleCoverImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const fileReader = new FileReader();
      const file = e.target.files[0];
      setCoverImageHolder(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = (event) => {
        const imgDataUrl = event.target?.result?.toString() || "";
        fieldChange(imgDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const fileReader = new FileReader();
      const file = e.target.files[0];
      setProfileImageHolder(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = (event) => {
        const imgDataUrl = event.target?.result?.toString() || "";
        fieldChange(imgDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: async ({
      name,
      bio,
      coverImage,
      profileImage,
    }: EditProfileValidatorType) => {
      const payload = {
        name,
        bio,
        coverImage,
        profileImage,
      };
      const { data } = await axios.put(`/api/user?userId=${userId}`, payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return toast.error(error.response.data);
        }
        if (error.response?.status === 404) {
          return toast.error(error.response.data);
        }
        if (error.response?.status === 409) {
          return toast.error(error.response.data);
        }
      }

      return toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Profile updated");
      router.refresh();
      editProfileModal.onClose();
    },
  });

  const onSubmit = async (values: EditProfileValidatorType) => {
    const coverImageBlob = values.coverImage as string;
    const profileImageBlob = values.profileImage as string;

    const hasCoverImageChanged = isBase64Image(coverImageBlob);
    const hasProfileImageChanged = isBase64Image(profileImageBlob);

    if (hasCoverImageChanged) {
      const coverImageResponse = await startUpload(coverImageHolder);

      if (coverImageResponse && coverImageResponse[0].url) {
        values.coverImage = coverImageResponse[0].url;
      }
    }

    if (hasProfileImageChanged) {
      const profileImageResponse = await startUpload(profileImageHolder);

      if (profileImageResponse && profileImageResponse[0].url) {
        values.profileImage = profileImageResponse[0].url;
      }
    }

    updateProfile(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="coverImage"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="relative h-52 bg-neutral-200">
                {field.value && (
                  <Image
                    src={field.value}
                    fill
                    alt="Cover image"
                    className="object-cover"
                  />
                )}
                <FormControl>
                  <div className="relative flex justify-center items-center h-full z-10">
                    <Label htmlFor="coverImage">
                      <div className="p-2 bg-neutral-700 hover:bg-opacity-75 rounded-full cursor-pointer transition">
                        <Camera className="text-white" />
                      </div>
                    </Label>
                    <Input
                      type="file"
                      id="coverImage"
                      disabled={isSubmitting || isLoading}
                      className="hidden"
                      onChange={(e) =>
                        handleCoverImageChange(e, field.onChange)
                      }
                    />
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="profileImage"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="relative h-32 w-32 rounded-full border-4 border-white -mt-16 left-4">
                <Image
                  src={field.value || "/placeholder.svg"}
                  fill
                  alt="Profile image"
                  className="object-cover rounded-full"
                />
                <FormControl>
                  <div className="relative flex justify-center items-center h-full z-10">
                    <Label htmlFor="profileImage">
                      <div className="p-2 bg-neutral-700 bg-opacity-75 hover:bg-opacity-50 rounded-full cursor-pointer transition">
                        <Camera className="text-white" />
                      </div>
                    </Label>
                    <Input
                      type="file"
                      id="profileImage"
                      disabled={isSubmitting || isLoading}
                      className="hidden"
                      onChange={(e) =>
                        handleProfileImageChange(e, field.onChange)
                      }
                    />
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <Label>Name</Label>
              <FormControl>
                <Input {...field} disabled={isSubmitting || isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="bio"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <Label>Bio</Label>
              <FormControl>
                <Textarea {...field} disabled={isSubmitting || isLoading} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            className="rounded-full w-[125px]"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
