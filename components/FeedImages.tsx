import { cn } from "@/lib/utils";
import Image from "next/image";

type FeedImagesProps = {
  data: string[];
};

const FeedImages = ({ data }: FeedImagesProps) => {
  return (
    <div
      className={cn(
        "grid gap-1",
        data && "mt-2",
        data.length === 1 ? "grid-cols-1" : "grid-cols-2",
        data.length >= 3 && "grid-cols-3"
      )}
    >
      {data &&
        data.map((image) => (
          <div
            key={image}
            className={cn(
              "relative",
              data.length === 1 ? "aspect-[3/2]" : "aspect-[2/3]"
            )}
          >
            <Image
              src={image}
              alt="Post image"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        ))}
    </div>
  );
};

export default FeedImages;
