import { cn } from "@/lib/utils";
import Image from "next/image";

type AvatarProps = {
  src: string;
  isLarge?: boolean;
};

const Avatar = ({ src, isLarge }: AvatarProps) => {
  return (
    <div
      className={cn(
        "relative rounded-full border-4 border-white",
        isLarge ? "h-36" : "h-12",
        isLarge ? "w-36" : "w-12"
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
