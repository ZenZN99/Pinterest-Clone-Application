import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import DashboardCards from "../components/admin/DashboardCards";
import { usePins } from "../hooks/usePins";
import Header from "../components/admin/Header";
import { useUsers } from "../hooks/useUsers";
import UsersTable from "../components/admin/UsersTable";
import PinsTable from "../components/admin/PinsTable";
import EditPinModal from "../components/admin/EditPinModal";
import type { IPin } from "../types/pin";
import { useComments } from "../hooks/useComments";
import { useParams } from "react-router-dom";
import CommentsTable from "../components/admin/CommentsTable";
import RepliesTable from "../components/admin/RepliesTable";
import { useChatStore } from "../stores/useChatStore";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useAllComments } from "../hooks/useAllComments";

const AdminDashboard = () => {
  const { pinId } = useParams();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "users" | "pins" | "comments" | "replies"
  >("dashboard");

  const {
    pins,
    loadingPin,
    deletePin,
    updatePin,
    ChangePin,
    formPin,
    setFormPin,
    setEditPinId,
  } = usePins();
  const { users, loadingUser, deleteUser } = useUsers();

  const {
    updateComment,
    deleteComment,
    setEditText,
    editText,
    editId,
    setEditId,
    repliesState,
    deleteReply,
    loading,
  } = useComments(pinId as string);

  const { comments } = useAllComments();
  const [isEditPinOpen, setIsEditPinOpen] = useState(false);
  const { onlineUsers } = useChatStore();

  const handleEditPin = (pin: IPin) => {
    setIsEditPinOpen(true);
    setEditPinId(pin._id as string);

    setFormPin({
      ...pin,
      image: null,
    });
  };

  return (
    <ProtectedRoute adminOnly>
      <div>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-10 overflow-auto">
          <Header
            title="Dashboard"
            description="Manage pins, users, and platform settings."
          />
          {activeTab === "dashboard" && (
            <DashboardCards
              pinsCount={pins.length}
              usersCount={users.length}
              commentsCount={comments.length}
              repliesCount={repliesState.length}
              loading={loadingPin}
            />
          )}

          {activeTab === "users" && (
            <UsersTable
              users={users}
              loading={loadingUser}
              onDelete={deleteUser}
              onlineUsers={onlineUsers}
            />
          )}

          {activeTab === "pins" && (
            <PinsTable
              pins={pins}
              onDelete={deletePin}
              onEdit={handleEditPin}
              loading={loadingPin}
            />
          )}

          {activeTab === "comments" && (
            <CommentsTable
              comments={comments}
              onDelete={deleteComment}
              onUpdate={updateComment as any}
              loading={loading}
              editText={editText}
              setEditText={setEditText}
              editId={editId}
              setEditId={setEditId}
            />
          )}

          {activeTab === "replies" && (
            <RepliesTable
              repliesState={repliesState}
              onDelete={deleteReply}
              loading={loading}
            />
          )}

          <EditPinModal
            isOpen={isEditPinOpen}
            onClose={() => {
              setIsEditPinOpen(false);
              setEditPinId(null);
            }}
            formPin={formPin}
            onChange={ChangePin}
            onUpdate={async () => {
              await updatePin();
              setIsEditPinOpen(false);
            }}
            loadingPin={loadingPin}
          />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
