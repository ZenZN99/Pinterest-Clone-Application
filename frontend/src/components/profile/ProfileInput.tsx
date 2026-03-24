import { FiEdit2 } from "react-icons/fi";
import type { IUser } from "../../types/user";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import Info from "./Info";

interface PropsProfileInput {
  user: IUser;
  handleAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setActiveTab: Dispatch<SetStateAction<"followers" | "following">>;
  setShowListModal: (val: boolean) => void;
  followersCount: number;
  followingCount: number;
  handleSave: () => void;
  loading: boolean;
  bio: string;
  setBio: Dispatch<SetStateAction<string>>;
}

const ProfileInput = ({
  user,
  handleAvatarChange,
  setActiveTab,
  setShowListModal,
  followersCount,
  followingCount,
  handleSave,
  loading,
  bio,
  setBio,
}: PropsProfileInput) => {
  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* AVATAR */}
      <div className="relative -mt-16 w-fit">
        <img
          src={user?.avatar || "/avatar.png"}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />

        <input
          id="avatarUpload"
          type="file"
          className="hidden"
          onChange={handleAvatarChange}
        />

        <label
          htmlFor="avatarUpload"
          className="absolute bottom-2 right-2 bg-black/60 p-2 rounded-full text-white cursor-pointer"
        >
          <FiEdit2 size={14} />
        </label>
      </div>

      {/* INFO */}
      <Info
        user={user}
        setActiveTab={setActiveTab}
        setShowListModal={setShowListModal}
        followersCount={followersCount}
        followingCount={followingCount}
        handleSave={handleSave}
        loading={loading}
        bio={bio}
        setBio={setBio}
      />
    </div>
  );
};

export default ProfileInput;
