import { PiBellZBold } from "react-icons/pi";
import {
  NotificationTypes,
  type INotification,
} from "../../types/notification";
import { Link } from "react-router-dom";
import { FaCheck, FaTrash } from "react-icons/fa";

interface PropsNotificationsList {
  notifications: INotification[];
  handleMarkAsRead: (nId: string) => void;
  handleDelete: (nId: string) => void;
}

const NotificationList = ({
  notifications,
  handleMarkAsRead,
  handleDelete,
}: PropsNotificationsList) => {
  const renderText = (type: string) => {
    switch (type) {
      case NotificationTypes.COMMENT:
        return "Commented on your post";
      case NotificationTypes.REPLY:
        return "Replied to your comment";
      case NotificationTypes.FOLLOW:
        return "You have been followed";
      case NotificationTypes.PIN:
        return "A new Pin has been created";
      default:
        return "sent you a notification";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {notifications.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg flex items-center gap-2 justify-center">
            No notifications yet <PiBellZBold />
          </p>
        </div>
      )}

      {notifications.map((n) => (
        <div
          key={n._id}
          className={`group flex items-center justify-between p-4 rounded-2xl backdrop-blur-md border transition duration-300
        ${
          n.isRead
            ? "bg-white/5 border-white/10"
            : "bg-red-500/10 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
        }
        hover:scale-[1.02] hover:bg-white/10`}
        >
          {/* USER INFO */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Link to={`/user/${n.senderId._id}`}>
                <img
                  src={n.senderId?.avatar || "/avatar.png"}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-red-500/30"
                />
              </Link>

              {/* unread dot */}
              {!n.isRead && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse border border-white" />
              )}
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">
                {n.senderId?.fullname || "Unknown User"} /
              </span>

              <span className="text-gray-400 text-xs">{n.senderId?.email}</span>

              <span className="text-sm text-gray-400 mt-1">
                {renderText(n.type)}
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition">
            {!n.isRead && (
              <button
                onClick={() => handleMarkAsRead(n._id)}
                className="p-2 rounded-full bg-green-500/10 text-green-400 hover:bg-green-500/20 transition"
                title="Mark as read"
              >
                <FaCheck size={14} />
              </button>
            )}

            <button
              onClick={() => handleDelete(n._id)}
              className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
              title="Delete"
            >
              <FaTrash size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
