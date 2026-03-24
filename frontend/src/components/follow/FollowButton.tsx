import type { Dispatch, SetStateAction } from "react";

interface PropsFollowButton {
  handleFollow: () => void;
  loadingFollow: boolean;
  isFollowingState: boolean;
  setActiveTab: Dispatch<SetStateAction<"followers" | "following">>;
  setShowListModal: (modal: boolean) => void;
  followersCount: number;
  followingCount: number;
}

const FollowButton = ({
  handleFollow,
  loadingFollow,
  isFollowingState,
  setActiveTab,
  setShowListModal,
  followersCount,
  followingCount,
}: PropsFollowButton) => {
  return (
    <div className="flex items-center gap-3 mt-2">
      <button
        onClick={handleFollow}
        disabled={loadingFollow}
        className={`px-6 py-2 rounded-full font-medium transition
                ${
                  isFollowingState
                    ? "bg-white border border-red-500 text-red-500 hover:bg-red-50"
                    : "bg-red-500 text-white hover:bg-red-600"
                }
                disabled:opacity-50
              `}
      >
        {loadingFollow
          ? "Loading..."
          : isFollowingState
            ? "Unfollow"
            : "+ Follow"}
      </button>

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
  );
};

export default FollowButton;
