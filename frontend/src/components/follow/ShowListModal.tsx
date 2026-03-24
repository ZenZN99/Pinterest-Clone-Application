import type { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import type { IFollow } from "../../types/follow";

interface PropsShowListModal {
  showListModal: boolean;
  setShowListModal: (val: boolean) => void;
  setActiveTab: Dispatch<SetStateAction<"followers" | "following">>;
  activeTab: "followers" | "following";
  followers: IFollow[];
  following: IFollow[];
}

const ShowListModal = ({
  showListModal,
  setShowListModal,
  setActiveTab,
  activeTab,
  followers,
  following,
}: PropsShowListModal) => {
  return (
    <div>
      {showListModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowListModal(false)}
        >
          <div
            className="bg-white w-[400px] max-h-[80vh] rounded-xl p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tabs */}
            <div className="flex justify-between mb-4 border-b pb-2">
              <button
                onClick={() => setActiveTab("followers")}
                className={`flex-1 py-2 font-semibold ${
                  activeTab === "followers"
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-gray-500"
                }`}
              >
                Followers
              </button>

              <button
                onClick={() => setActiveTab("following")}
                className={`flex-1 py-2 font-semibold ${
                  activeTab === "following"
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-gray-500"
                }`}
              >
                Following
              </button>
            </div>

            {/* List */}
            <div className="max-h-64 overflow-y-auto space-y-3">
              {activeTab === "followers" &&
                followers?.map((f: any) => (
                  <div key={f._id} className="flex items-center gap-3">
                    <Link
                      onClick={() => setShowListModal(false)}
                      to={`/user/${f.follower?._id}`}
                    >
                      <img
                        src={f.follower?.avatar}
                        className="w-10 h-10 rounded-full"
                      />
                    </Link>
                    <p className="font-medium">{f.follower?.fullname}</p>
                  </div>
                ))}

              {activeTab === "following" &&
                following.map((f: any) => (
                  <div key={f._id} className="flex items-center gap-3">
                    <Link
                      onClick={() => setShowListModal(false)}
                      to={`/user/${f.following?._id}`}
                    >
                      <img
                        src={f.following?.avatar}
                        className="w-10 h-10 rounded-full"
                      />
                    </Link>
                    <p className="font-medium">{f.following?.fullname}</p>
                  </div>
                ))}
            </div>

            {/* Close */}
            <button
              onClick={() => setShowListModal(false)}
              className="mt-4 w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowListModal;
