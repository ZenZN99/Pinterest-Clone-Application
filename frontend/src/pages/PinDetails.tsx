import { useParams } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect, useState } from "react";
import type { IPin } from "../types/pin";
import { getPinById } from "../apis/pin.api";
import { type IUser } from "../types/user";
import toast from "react-hot-toast";
import PinDetailsSkeleton from "../components/skeletons/PinDetailsSkeleton";
import PinImage from "../components/details/PinImage";
import PinHeader from "../components/details/PinHeader";
import PinInfo from "../components/details/PinInfo";
import CommentsSection from "../components/details/CommentsSection";
import AddComment from "../components/details/AddComment";
import ImageModal from "../components/details/ImageModal";
import { useComments } from "../hooks/useComments";
import PinNotFound from "../components/PinNotFound";
import { useChatStore } from "../stores/useChatStore";
import ProtectedRoute from "../routes/ProtectedRoute";
const PinDetails = () => {
  const { id } = useParams();
  const [pin, setPin] = useState<IPin | null>(null);
  const [pinUser, setPinUser] = useState<IUser | null>(null);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const {
    editText,
    setEditText,
    editId,
    comments,
    replies,
    newCommentText,
    setNewCommentText,
    createComment,
    updateComment,
    deleteComment,
    createReply,
    deleteReply,
    setEditId,
  } = useComments(id as string);
  const currentUser = useAuthStore((state) => state.user);
  const { onlineUsers } = useChatStore();
  const token = localStorage.getItem("token") as string;
  useEffect(() => {
    const fetchPinData = async () => {
      if (!id) return;
      try {
        const pinData = await getPinById(token, id);
        setPin(pinData);
        setPinUser(pinData.userId);
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchPinData();
  }, [id]);

  if (loading) return <PinDetailsSkeleton />;
  if (!pin?._id) return <PinNotFound />;
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center p-4 mt-10">
        {" "}
        <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2 border">
          {" "}
          {/* IMAGE */}{" "}
          <PinImage pin={pin} setShowImageModal={setShowImageModal} />{" "}
          {/* DETAILS */}{" "}
          <div className="flex flex-col p-4 h-[70vh]">
            {" "}
            {/* USER */}{" "}
            <PinHeader pinUser={pinUser} onlineUsers={onlineUsers} />
            <PinInfo pin={pin} /> {/* COMMENTS */}{" "}
            <CommentsSection
              comments={comments}
              currentUser={currentUser}
              updateComment={updateComment}
              deleteComment={deleteComment}
              replies={replies}
              deleteReply={deleteReply}
              createReply={createReply}
              replyInputs={replyInputs}
              setReplyInputs={setReplyInputs}
              editId={editId}
              editText={editText}
              setEditId={setEditId}
              setEditText={setEditText}
              onlineUsers={onlineUsers}
            />
            {/* ADD COMMENT */}
            <AddComment
              text={newCommentText}
              setNewCommentText={setNewCommentText}
              createComment={createComment}
            />
          </div>
        </div>
        {/* IMAGE MODAL */}
        <ImageModal
          showImageModal={showImageModal}
          setShowImageModal={setShowImageModal}
          pin={pin}
        />
      </div>
    </ProtectedRoute>
  );
};
export default PinDetails;
