import { Notification } from "@prisma/client";
import Image from "next/image";

type NotificationFeedProps = {
  data: Notification;
};

const NotificationFeed = ({ data }: NotificationFeedProps) => {
  return (
    <>
      <div className="border-b border-neutral-100 hover:bg-neutral-100 transition-all cursor-pointer">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-4">
            <Image src="/logo.svg" alt="logo" width={20} height={20} />
            <p className="text-neutral-700">{data.body}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationFeed;
