import { useEffect, useState, type ChangeEvent } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { updateProfile } from "../apis/user.api";
import toast from "react-hot-toast";

export const useProfile = () => {
  const { user, loadUser, isLoading } = useAuthStore();

  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<File | string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const token = localStorage.getItem("token") as string;

  useEffect(() => {
    if (user) setBio(user.bio || "");
  }, [user]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImageSrc(url as string);
    }
  };

  const getCroppedImg = async (imageSrc: string, crop: any) => {
    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx?.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob!], "cover.jpg", {
          type: "image/jpeg",
        });
        resolve(file);
      }, "image/jpeg");
    });
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    try {
      let coverFile: File | null = null;

      if (imageSrc && croppedAreaPixels) {
        coverFile = await getCroppedImg(imageSrc as string, croppedAreaPixels);
      }

      const data = await updateProfile(token, avatarFile, coverFile, bio);

      if (data?.success) {
        toast.success("Profile updated successfully!");
        loadUser();
        setImageSrc(null);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
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
    bio,
    setBio,
    loading,
  };
};
