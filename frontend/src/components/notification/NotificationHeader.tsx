interface PropsNotificationHeader {
  unreadCount: number;
  handleMarkAllAsRead: () => void;
}

const NotificationHeader = ({
  unreadCount,
  handleMarkAllAsRead,
}: PropsNotificationHeader) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold mt-2">Notifications</h1>
        <p className="text-gray-400 text-sm">
          Stay updated with your latest activity
        </p>
      </div>

      {unreadCount > 0 && (
        <button
          onClick={handleMarkAllAsRead}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:scale-105 transition"
        >
          Mark all as read
        </button>
      )}
    </div>
  );
};

export default NotificationHeader;
