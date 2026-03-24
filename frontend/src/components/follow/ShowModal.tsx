import type { IUser } from "../../types/user";

interface PropsShowModal {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  user: IUser;
}

const ShowModal = ({ showModal, setShowModal, user }: PropsShowModal) => {
  return (
    <div>
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={user?.avatar || "/avatar.png"}
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowModal;
