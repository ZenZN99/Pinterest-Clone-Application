import { useEffect, useState } from "react";
import type { IFollow } from "../types/follow";
import {
  followUser,
  getFollowers,
  getFollowersCount,
  getFollowing,
  getFollowingCount,
  isFollowing,
  unfollowUser,
} from "../apis/follow.api";
import toast from "react-hot-toast";

export const useFollows = (id: string) => {
  const [isFollowingState, setIsFollowingState] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followers, setFollowers] = useState<IFollow[]>([]);
  const [following, setFollowing] = useState<IFollow[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    "followers",
  );
  const token = localStorage.getItem("token") as string;

  useEffect(() => {
    const checkFollowing = async () => {
      if (!id || !token) return;
      try {
        const data = await isFollowing(id, token);
        setIsFollowingState(data ?? false);
      } catch {
        toast.error("Error checking follow status");
      }
    };

    checkFollowing();
  }, [id, token]);

  useEffect(() => {
    const fetchFollowData = async () => {
      if (!id || !token) return;

      try {
        const followersData = await getFollowers(id, token);
        const followingData = await getFollowing(id, token);

        const followersCountData = await getFollowersCount(id, token);
        const followingCountData = await getFollowingCount(id, token);

        setFollowers(followersData || []);
        setFollowing(followingData || []);

        setFollowersCount(followersCountData || 0);
        setFollowingCount(followingCountData || 0);
      } catch {
        toast.error("Error loading follow data");
      }
    };

    fetchFollowData();
  }, [id, token]);

  const handleFollow = async () => {
    if (!id || !token) return;
    setLoadingFollow(true);

    try {
      if (isFollowingState) {
        await unfollowUser(id, token);
        setIsFollowingState(false);
        toast.success("Unfollowed");
      } else {
        await followUser(id, token);
        setIsFollowingState(true);
        toast.success("Followed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoadingFollow(false);
    }
  };

  return {
    loadingFollow,
    followersCount,
    followingCount,
    followers,
    following,
    isFollowingState,
    handleFollow,
    showModal,
    showListModal,
    activeTab,
    setShowModal,
    setShowListModal,
    setActiveTab
  };
};
