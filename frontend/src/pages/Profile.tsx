import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import { useFollows } from "../hooks/useFollows";
import ShowModal from "../components/follow/ShowModal";
import ShowListModal from "../components/follow/ShowListModal";
import ProfileInput from "../components/profile/ProfileInput";
import Cover from "../components/profile/Cover";
import { useProfile } from "../hooks/useProfile";
import ProtectedRoute from "../routes/ProtectedRoute";

const Profile = () => {
  const {
    user,
    imageSrc,
    crop,
    zoom,
    setCrop,
    setZoom,
    setCroppedAreaPixels,
    handleCoverChange,
    handleAvatarChange,
    handleSave,
    loading,
    bio,
    setBio,
  } = useProfile();

  const userId = user?._id;

  const {
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
  } = useFollows(userId as string);

  if (loading || !user) return <ProfileSkeleton />;

  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen bg-gray-100">
        {/* COVER */}
        <Cover
          user={user}
          imageSrc={imageSrc}
          crop={crop}
          zoom={zoom}
          setCrop={setCrop}
          setZoom={setZoom}
          setCroppedAreaPixels={setCroppedAreaPixels}
          handleCoverChange={handleCoverChange}
        />

        {/* PROFILE */}
        <ProfileInput
          user={user}
          handleAvatarChange={handleAvatarChange}
          setActiveTab={setActiveTab}
          setShowListModal={setShowListModal}
          followersCount={followersCount}
          followingCount={followingCount}
          handleSave={handleSave}
          loading={loading}
          bio={bio}
          setBio={setBio}
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

export default Profile;
