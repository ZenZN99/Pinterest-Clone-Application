import { useEffect, useState } from "react";
import { useNotificationStore } from "../stores/useNotificationStore";
import {
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../apis/notification.api";
import toast from "react-hot-toast";
import NotificationsSkeleton from "../components/skeletons/NotificationSkeleton";
import ProtectedRoute from "../routes/ProtectedRoute";
import NotificationList from "../components/notification/NotificationList";
import NotificationHeader from "../components/notification/NotificationHeader";

const Notifications = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const {
    notifications,
    unreadCount,
    fetchNotifications,
    fetchUnreadCount,
    markAsReadLocal,
    socket,
    initSocket,
  } = useNotificationStore();

  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      setLoading(true);

      await fetchNotifications(token);
      await fetchUnreadCount(token);
      initSocket(token);

      setLoading(false);
    };

    loadData();

    return () => {
      socket?.off("receive-notification");
    };
  }, [token]);

  const handleMarkAsRead = async (id: string) => {
    if (!token) return;
    await markAsRead(token, id);
    markAsReadLocal(id);
  };

  const handleMarkAllAsRead = async () => {
    if (!token) return;
    await markAllAsRead(token);
    notifications.forEach((n) => markAsReadLocal(n._id));
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    await deleteNotification(token, id);
    const updated = notifications.filter((n) => n._id !== id);
    useNotificationStore.setState({ notifications: updated });
    toast.success("Notification deleted");
  };

  if (loading) return <NotificationsSkeleton />;

  return (
    <ProtectedRoute>
      <div className="p-6 max-w-4xl mx-auto mt-20">
        {/* HEADER */}
        <NotificationHeader
          unreadCount={unreadCount}
          handleMarkAllAsRead={handleMarkAllAsRead}
        />

        {/* LIST */}
        <NotificationList
          notifications={notifications}
          handleMarkAsRead={handleMarkAsRead}
          handleDelete={handleDelete}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Notifications;
