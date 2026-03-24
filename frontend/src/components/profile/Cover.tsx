import Cropper from "react-easy-crop";
import { FiEdit2 } from "react-icons/fi";
import type { IUser } from "../../types/user";

interface PropsCover {
  user: IUser;
  imageSrc: string | File | null;
  crop: { x: number; y: number };
  zoom: number;
  setCrop: (crop: { x: number; y: number }) => void;
  setZoom: (zoom: number) => void;
  setCroppedAreaPixels: (croppedArea: any) => void;
  handleCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Cover = ({
  user,
  imageSrc,
  crop,
  zoom,
  setCrop,
  setZoom,
  setCroppedAreaPixels,
  handleCoverChange,
}: PropsCover) => {
  return (
    <div className="relative w-full h-64 bg-gray-300 overflow-hidden rounded-lg">
      {/* CROPPER */}
      {imageSrc ? (
        <Cropper
          image={imageSrc as string}
          crop={crop}
          zoom={zoom}
          aspect={16 / 9}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels);
          }}
        />
      ) : user?.cover ? (
        <img
          src={user.cover}
          className="w-full h-full object-cover"
          alt="cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-600">
          No Cover Image
        </div>
      )}

      {/* INPUT */}
      <input
        id="coverUpload"
        type="file"
        accept="image/*"
        onChange={handleCoverChange}
        className="hidden"
      />

      {/* ICON */}
      <label
        htmlFor="coverUpload"
        className="absolute bottom-4 right-4 bg-black/60 p-2 rounded-full text-white cursor-pointer hover:bg-black/80 transition"
      >
        <FiEdit2 size={18} />
      </label>
    </div>
  );
};

export default Cover;
