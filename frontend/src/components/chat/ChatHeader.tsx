import { useNavigate } from "react-router-dom";
import type { IUser } from "../../types/user";

interface ChatHeaderProps {
  selectedUser: IUser;
  onlineUsers: string[];
  typingUserId: string | null;
  navigate: (route: string) => void;
}

export default function ChatHeader({
  selectedUser,
  onlineUsers,
  typingUserId,
}: ChatHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b shadow-sm px-5 py-3 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <img
          src={selectedUser.avatar || "/default-avatar.png"}
          onClick={() => navigate(`/user/${selectedUser?._id}`)}
          className="w-11 h-11 rounded-full object-cover cursor-pointer border-2 border-red-500"
        />

        <div>
          <h2 className="font-semibold text-gray-900 text-sm">
            {selectedUser.fullname}
          </h2>

          <div className="text-xs">
            {onlineUsers.includes(selectedUser._id as string) ? (
              <span className="text-green-500">Online</span>
            ) : (
              <span className="text-gray-400">Offline</span>
            )}
            {/* Typing */}
            {typingUserId === selectedUser._id && (
              <span className="px-3 text-red-500 text-xs animate-pulse">
                typing...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
