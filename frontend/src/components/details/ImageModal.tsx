import type { IPin } from "../../types/pin";

interface PropImageModal {
  showImageModal: boolean;
  setShowImageModal: (value: boolean) => void;
  pin: IPin | null;
}

const ImageModal = ({
  showImageModal,
  setShowImageModal,
  pin,
}: PropImageModal) => {
  return (
    <div>
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowImageModal(false)}
        >
          <img
            src={pin?.image as any}
            className="max-h-[85%] max-w-[85%] rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageModal;
