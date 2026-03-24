import type { Dispatch, SetStateAction } from "react";
import type { IUser } from "../../types/user";
import FollowButton from "../follow/FollowButton";

interface PropsProfileInfo {
  user: IUser;
  setShowModal: (val: boolean) => void;
  onlineUsers: string[];
  handleFollow: () => void;
  loadingFollow: boolean;
  isFollowingState: boolean;
  setActiveTab: Dispatch<SetStateAction<"followers" | "following">>;
  setShowListModal: (modal: boolean) => void;
  followersCount: number;
  followingCount: number;
}

const ProfileInfo = ({
  user,
  setShowModal,
  onlineUsers,
  handleFollow,
  loadingFollow,
  isFollowingState,
  setActiveTab,
  setShowListModal,
  followersCount,
  followingCount,
}: PropsProfileInfo) => {
  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* AVATAR */}
      <div className="relative -mt-16 w-fit group">
        <div className="relative">
          <img
            src={user?.avatar || "/avatar.png"}
            onClick={() => setShowModal(true)}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl cursor-pointer ring-2 ring-red-200 group-hover:ring-red-400 transition duration-300 hover:scale-105"
          />

          {/* Online Dot */}
          {onlineUsers.includes(user._id as string) && (
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-[lime] border-2 border-white rounded-full shadow-[0_0_10px_rgba(132,204,22,0.9)] animate-pulse" />
          )}
        </div>

        {/* Optional Glow Background */}
        <div className="absolute inset-0 rounded-full blur-2xl bg-red-200 opacity-20 -z-10" />
      </div>

      {/* INFO */}
      <div className="mt-4 flex flex-col gap-3">
        <h2 className="text-3xl font-bold">{user?.fullname}</h2>
        <p className="text-gray-600">{user?.email}</p>

        {/* Follow Button */}
        <FollowButton
          handleFollow={handleFollow}
          loadingFollow={loadingFollow}
          isFollowingState={isFollowingState}
          setActiveTab={setActiveTab}
          setShowListModal={setShowListModal}
          followersCount={followersCount}
          followingCount={followingCount}
        />

        {/* BIO */}
        <div className="w-full p-3 border rounded-lg bg-white text-gray-700">
          {user?.bio || "No bio available"}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
