import { Metadata } from "next";

import { getNotifications } from "@/actions/notifications/getNotification";
import DeleteButton from "@/components/DeleteButton";
import Header from "@/components/Header";
import NotificationFeed from "@/components/NotificationFeed";

export const metadata: Metadata = {
  title: "Notifications / X",
  description: "Homepage",
};

const Page = async () => {
  const notifications = await getNotifications();

  return (
    <div>
      <Header label="Notifications" showBackArrow />
      <div className="mt-4">
        {notifications?.length === 0 ? (
          <p className="text-center">No notifications yet.</p>
        ) : (
          <DeleteButton />
        )}
      </div>
      <div className="mt-4">
        {notifications?.map((notification) => (
          <NotificationFeed key={notification.id} data={notification} />
        ))}
      </div>
    </div>
  );
};

export default Page;
