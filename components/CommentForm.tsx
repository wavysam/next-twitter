"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { Form, FormField, FormItem, FormControl } from "./ui/form";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import {
  CommentValidatorSchema,
  CommentValidatorType,
} from "@/lib/validator/commentValidator";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ImagePreview from "./ImagePreview";
import { useUploadThing } from "@/lib/uploadthing";

type CommentFormProps = {
  postId: string;
};

const CommentForm = ({ postId }: CommentFormProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const form = useForm<CommentValidatorType>({
    resolver: zodResolver(CommentValidatorSchema),
    defaultValues: {
      body: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = form;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      const filesArray = Array.from(files);
      setImages(filesArray);

      for (let i = 0; i <= filesArray.length; i++) {
        const fileReader = new FileReader();

        const file = filesArray[i];

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

  const { mutate: createComment, isLoading } = useMutation({
    mutationFn: async ({
      body,
      images,
      postId,
    }: {
      body: string;
      images: string[];
      postId: string;
    }) => {
      const payload = {
        body,
        images,
        postId,
      };
      const { data } = await axios.post("/api/comment", payload);
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
      router.refresh();
      toast.success("Comment added");
      reset();
      setImagesPreview([]);
      setImages([]);
    },
  });

  const onSubmit = async (values: CommentValidatorType) => {
    let imagesUrl: string[] = [];

    if (images && images.length > 0) {
      const imageUploadResponse = await startUpload(images);

      if (imageUploadResponse) {
        imageUploadResponse.map((item) => imagesUrl.push(item.url));
      }
    }

    createComment({
      body: values.body,
      images: imagesUrl,
      postId,
    });
  };

  const inputRef = useRef(null);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-2">
          <FormField
            name="body"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <TextareaAutosize
                    {...field}
                    ref={inputRef}
                    rows={1}
                    disabled={isLoading || isSubmitting}
                    onFocus={() => setIsFocused(true)}
                    placeholder="Post your reply"
                    className="w-full resize-none bg-white focus:outline-none placeholder:text-xl text-lg"
                  />
                </FormControl>
                <ImagePreview
                  data={imagesPreview}
                  stateAction={setImagesPreview}
                />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading || !isValid}
            className={cn(
              "rounded-full w-[100px]",
              isFocused ? "hidden" : "block"
            )}
          >
            {isLoading || isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Reply"
            )}
          </Button>
        </div>

        {isFocused && (
          <div className="flex justify-between items-center mt-3">
            <div>
              <Label htmlFor="images">
                <div className="p-2 rounded-full text-neutral-700 hover:bg-neutral-200 transition cursor-pointer">
                  <ImageIcon className="h-5 w-5" />
                </div>
              </Label>
              <Input
                type="file"
                multiple
                id="images"
                disabled={isLoading || isSubmitting}
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <Button
              disabled={isLoading || !isValid || isSubmitting}
              className="rounded-full w-[100px]"
            >
              {isLoading || isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Reply"
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CommentForm;
