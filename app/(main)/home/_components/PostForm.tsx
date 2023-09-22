"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import {
  CreatePostValidatorSchema,
  CreatePostValidatorType,
} from "@/lib/validator/createPostValidator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImagesPreview from "./ImagesPreview";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

const PostForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const form = useForm<CreatePostValidatorType>({
    resolver: zodResolver(CreatePostValidatorSchema),
    defaultValues: {
      body: "",
    },
  });

  const {
    handleSubmit,
    reset,
    watch,

    formState: { isSubmitting, isValid },
  } = form;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      const fileArray = Array.from(files);
      setImages(fileArray);

      for (let i = 0; i <= fileArray.length; i++) {
        const fileReader = new FileReader();

        const file = fileArray[i];

        if (!file?.type.includes("image")) {
          return;
        }

        fileReader.onload = (event) => {
          const imgDataUrl = event.target?.result?.toString() || "";
          setImagesPreview((prev) => [...prev, imgDataUrl]);
        };

        fileReader.readAsDataURL(file);
      }
    }
  };

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async ({
      body,
      images,
    }: {
      body: string;
      images: string[];
    }) => {
      const payload = {
        body,
        images,
      };
      const { data } = await axios.post("/api/post", payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return toast.error(error.response.data);
        }
        if (error.response?.status === 409) {
          return toast.error(error.response.data);
        }
      }
      return toast.error("Something went wrong");
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Post created");
      setImagesPreview([]);
      reset();
    },
  });

  const onSubmit = async (values: CreatePostValidatorType) => {
    console.log(values);

    let imagesUrl: string[] = [];

    if (images && images.length > 0) {
      const imagesUploadResponse = await startUpload(images);

      if (imagesUploadResponse && imagesUploadResponse.length > 0) {
        imagesUploadResponse.map((item) => imagesUrl.push(item.url));
      }
    }

    createPost({
      body: values.body,
      images: imagesUrl,
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="body"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextareaAutosize
                    {...field}
                    placeholder="What is happening?!"
                    className="w-full resize-none pb-4 text-lg text-neutral-700 placeholder:text-lg placeholder:text-neutral-500 focus:outline-none"
                    minRows={2}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {imagesPreview && (
            <ImagesPreview
              data={imagesPreview}
              stateAction={setImagesPreview}
            />
          )}

          <hr className="border-t border-neutral-200/70" />

          <div className="flex justify-between items-center pt-3">
            <div>
              <Label htmlFor="images">
                <div className="hover:bg-neutral-200 p-2 rounded-full peer cursor-pointer transition">
                  <ImageIcon className="h-5 w-5 text-neutral-700" />
                </div>
              </Label>
              <Input
                type="file"
                id="images"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex items-center gap-4">
              {watch("body").length > 0 && (
                <div className="font-medium">
                  <span
                    className={cn(
                      "text-sm",
                      isValid ? "text-neutral-700" : "text-red-500"
                    )}
                  >
                    {watch("body").length}
                  </span>
                  <span className="text-sm text-neutral-700">/280</span>
                </div>
              )}
              <Button
                size="sm"
                className="rounded-full w-[100px]"
                disabled={isSubmitting || isLoading || !isValid}
              >
                {isSubmitting || isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PostForm;
