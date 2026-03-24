import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IUser } from "../types/user";
import { getUserById } from "../apis/user.api";
import toast from "react-hot-toast";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import UserNotFound from "../components/UserNotFound";
import { useChatStore } from "../stores/useChatStore";
import { useFollows } from "../hooks/useFollows";
import ShowModal from "../components/follow/ShowModal";
import ShowListModal from "../components/follow/ShowListModal";
import Cover from "../components/viewProfile/Cover";
import ProfileInfo from "../components/viewProfile/ProfileInfo";
import ProtectedRoute from "../routes/ProtectedRoute";

const ViewProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  const { onlineUsers } = useChatStore();

  const {
    loadingFollow,
    handleFollow,
    isFollowingState,
    followersCount,
    followingCount,
    followers,
    following,
    showModal,
    showListModal,
    activeTab,
    setShowModal,
    setShowListModal,
    setActiveTab,
  } = useFollows(id as string); 

  const token = localStorage.getItem("token") as string;

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await getUserById(token, id as string);
        if (data) setUser(data);
        else toast.error("Failed to fetch user");
      } catch {
        toast.error("Error fetching data, please refresh page");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (loading) return <ProfileSkeleton />;
  if (!user?._id) return <UserNotFound />;

  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen bg-gray-100">
        {/* COVER */}
        <Cover user={user} />

        {/* PROFILE INFO*/}
        <ProfileInfo
          user={user}
          setShowModal={setShowModal}
          onlineUsers={onlineUsers}
          handleFollow={handleFollow}
          loadingFollow={loadingFollow}
          isFollowingState={isFollowingState}
          setActiveTab={setActiveTab}
          setShowListModal={setShowListModal}
          followersCount={followersCount}
          followingCount={followingCount}
        />

        {/* MODAL */}
        <ShowModal
          showModal={showModal}
          setShowModal={setShowModal}
          user={user}
        />

        <ShowListModal
          showListModal={showListModal}
          setShowListModal={setShowListModal}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          followers={followers}
          following={following}
        />
      </div>
    </ProtectedRoute>
  );
};

export default ViewProfile;