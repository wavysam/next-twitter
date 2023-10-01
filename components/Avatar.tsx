import { cn } from "@/lib/utils";
import Image from "next/image";

type AvatarProps = {
  src: string;
  isLarge?: boolean;
  isBordered?: boolean;
};

const Avatar = ({ src, isLarge, isBordered }: AvatarProps) => {
  return (
    <div
      className={cn(
        "relative rounded-full hover:opacity-75 transition",
        isLarge ? "h-36" : "h-11",
        isLarge ? "w-36" : "w-11",
        isBordered ? "border-4" : "border-0",
        isBordered ? "border-white" : "border-none"
      )}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt="Profile image"
        fill
        className="object-cover rounded-full"
      />
    </div>
  );
};

export default Avatar;
