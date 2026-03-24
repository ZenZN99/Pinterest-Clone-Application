import type { Dispatch, SetStateAction } from "react";
import type { IUser } from "../../types/user";
import SaveButton from "./SaveButton";

interface PropsInfo {
  user: IUser;
  setActiveTab: Dispatch<SetStateAction<"followers" | "following">>;
  setShowListModal: (val: boolean) => void;
  followersCount: number;
  followingCount: number;
  handleSave: () => void;
  loading: boolean;
  bio: string;
  setBio: Dispatch<SetStateAction<string>>;
}

const Info = ({
  user,
  setActiveTab,
  setShowListModal,
  followersCount,
  followingCount,
  handleSave,
  loading,
  bio,
  setBio,
}: PropsInfo) => {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <h2 className="text-3xl font-bold">{user?.fullname}</h2>

      <p className="text-gray-600">{user?.email}</p>

      <div className="flex items-center gap-3">
        <div className="flex gap-6 mt-3 text-gray-700">
          <p
            className="cursor-pointer hover:underline"
            onClick={() => {
              setActiveTab("followers");
              setShowListModal(true);
            }}
          >
            <span className="font-bold">{followersCount}</span> Followers
          </p>

          <p
            className="cursor-pointer hover:underline"
            onClick={() => {
              setActiveTab("following");
              setShowListModal(true);
            }}
          >
            <span className="font-bold">{followingCount}</span> Following
          </p>
        </div>
      </div>

      {/* BIO */}
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Add a bio..."
        className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
      />

      {/* SAVE */}
      <SaveButton handleSave={handleSave} loading={loading} />
    </div>
  );
};

export default Info;
