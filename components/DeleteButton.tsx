"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { deleteAllNotifications } from "@/actions/notifications/deleteNotifications";

const DeleteButton = () => {
  const [loading, setLoading] = useState(false);

  const onDeleteAllNotifications = async () => {
    setLoading(true);
    try {
      await deleteAllNotifications();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-end mb-3 mr-4">
      <Button
        size="sm"
        variant="ghost"
        disabled={loading}
        onClick={onDeleteAllNotifications}
      >
        Clear All
      </Button>
    </div>
  );
};

export default DeleteButton;
