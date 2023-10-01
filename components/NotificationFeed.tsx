import prisma from "@/lib/prisma";
import { Notification } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

type NotificationFeedProps = {
  data: Notification;
};

const NotificationFeed = async ({ data }: NotificationFeedProps) => {
  return (
    <div className="border-b border-neutral-200 hover:bg-neutral-100 transition-all">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-4">
          <Image src="/logo.svg" alt="logo" width={20} height={20} />
          <p className="text-neutral-700">{data.body}</p>
        </div>
        <p className="text-sm text-neutral-700">
          {dayjs(data.createdtAt).format("hh:mm A · MMM DD, YYYY")}
        </p>
      </div>
    </div>
  );
};

export default NotificationFeed;
