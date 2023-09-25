"use client";

import Image from "next/image";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

type ImagesPreviewProps = {
  data: string[];
  stateAction: Dispatch<SetStateAction<string[]>>;
};

const ImagePreview = ({ data, stateAction }: ImagesPreviewProps) => {
  const onRemove = (index: number) => {
    stateAction(data.filter((_, idx) => idx !== index));
  };

  return (
    <div
      className={cn(
        "grid gap-3 mb-3",
        data.length === 2 ? "grid-cols-2" : "grid-cols-1",
        data.length >= 3 && "grid-cols-3"
      )}
    >
      {data.map((item, index) => (
        <div
          key={index}
          className={cn("relative", data.length === 1 ? "h-64" : "h-48")}
        >
          <div className="absolute top-2 right-2 z-10">
            <div
              className="bg-slate-600 hover:bg-opacity-75 rounded-full p-1 cursor-pointer transition"
              onClick={() => onRemove(index)}
            >
              <X className="text-white h-5 w-5" />
            </div>
          </div>
          <Image src={item} fill alt="" className="object-cover rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
