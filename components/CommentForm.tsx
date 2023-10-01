"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Form, FormField, FormItem, FormControl } from "./ui/form";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import {
  CommentValidatorSchema,
  CommentValidatorType,
} from "@/lib/validator/commentValidator";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ImagePreview from "./ImagePreview";
import { useUploadThing } from "@/lib/uploadthing";
import createComment from "@/actions/comments/createComment";

type CommentFormProps = {
  postId: string;
};

const CommentForm = ({ postId }: CommentFormProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const { startUpload } = useUploadThing("imageUploader");
  const pathname = usePathname();

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

  const onSubmit = async (values: CommentValidatorType) => {
    let imagesUrl: string[] = [];

    if (imagesPreview && imagesPreview.length > 0) {
      const imageUploadResponse = await startUpload(images);

      if (imageUploadResponse) {
        imageUploadResponse.map((item) => imagesUrl.push(item.url));
      }
    }

    await createComment({
      body: values.body,
      images: imagesUrl,
      postId,
      path: pathname,
    });

    reset();
    setImagesPreview([]);
    setImages([]);
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
                    disabled={isSubmitting}
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
            disabled={!isValid || isSubmitting}
            className={cn(
              "rounded-full w-[100px]",
              isFocused ? "hidden" : "block"
            )}
          >
            {isSubmitting ? (
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
                disabled={isSubmitting}
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <Button
              disabled={!isValid || isSubmitting}
              className="rounded-full w-[100px]"
            >
              {isSubmitting ? (
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
