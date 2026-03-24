import { Link } from "react-router-dom";
import type { IUser } from "../../types/user";

const PinHeader = ({ pinUser, onlineUsers }: any) => {
  const isUserObject = (user: any): user is IUser => {
    return user && typeof user === "object" && "_id" in user;
  };

  const getUserAvatar = (user: any) => {
    if (isUserObject(user) && user.avatar) return user.avatar;
    return "/default-avatar.png";
  };
  return (
    <div className="flex items-center gap-2 mb-3">
      {/* Avatar Wrapper */}
      <Link to={`/user/${pinUser?._id}`} className="relative inline-block">
        <img
          src={getUserAvatar(pinUser)}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />

        {/* Online Dot (bottom center) */}
        {onlineUsers.includes(pinUser?._id as string) && (
          <span
            className="
          absolute -bottom-1 -right-1/4
          -translate-x-1/2
          w-3 h-3
          bg-[lime]
          border-2 border-white
          rounded-full
          shadow-[0_0_10px_rgba(132,204,22,0.9)]
        "
          />
        )}
      </Link>

      {/* User Info */}
      <div>
        <p className="text-sm font-semibold text-gray-800">
          {pinUser?.fullname}
        </p>
        <p className="text-xs text-gray-400">Creator</p>
      </div>
    </div>
  );
};

export default PinHeader;
