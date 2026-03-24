import { useEffect, useState, type ChangeEvent } from "react";
import { useUsers } from "../hooks/useUsers";
import { useAuthStore } from "../stores/useAuthStore";
import { useChatStore } from "../stores/useChatStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket";
import { MdArrowBack } from "react-icons/md";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import ChatInput from "../components/chat/ChatInput";
import ChatSidebar from "../components/chat/ChatSidebar";
import ProtectedRoute from "../routes/ProtectedRoute";

const Messaging = () => {
  const {
    selectedUser,
    messages,
    onlineUsers,
    typingUserId,
    selectUser,
    fetchMessages,
    sendMessage,
    emitTyping,
    markAsRead,
    deleteMessage,
    initSocket,
  } = useChatStore();

  const { user, logout } = useAuthStore();
  const { users } = useUsers();
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      setToken(t);

      if (!t) {
        toast.error("Unauthorized");
        navigate("/login");
      }
    }
  }, []);

  useEffect(() => {
    initSocket();
    return () => {
      const socket = getSocket();
      socket.off("receive-message");
      socket.off("typing");
      socket.off("online-users");
      socket.off("message-seen");
    };
  }, []);

  useEffect(() => {
    if (!selectedUser || !token) return;

    fetchMessages(selectedUser._id as string, token);
    markAsRead(selectedUser._id as string, token);

    if (window.innerWidth < 768) setShowSidebar(false);
  }, [selectedUser, token]);

  const handleSend = async () => {
    if ((!message.trim() && !image) || !selectedUser || !token) return;

    await sendMessage(token, selectedUser._id as string, message, image);
    setMessage("");
    setImage(null);
    emitTyping(user!._id as string, selectedUser._id as string, false);
  };

  const handleTyping = (value: string) => {
    setMessage(value);
    if (!selectedUser) return;
    emitTyping(
      user!._id as string,
      selectedUser._id as string,
      value.length > 0,
    );
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImage(e.target.files[0]);
  };

  const handleBack = () => setShowSidebar(true);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100 flex-col md:flex-row">
      {showSidebar && (
        <div className="w-full md:w-auto md:block">
          <ChatSidebar
            users={users}
            search={search}
            setSearch={setSearch}
            selectedUser={selectedUser}
            onlineUsers={onlineUsers}
            selectUser={selectUser}
            user={user!}
            logout={logout}
          />
        </div>
      )}

      <main className="flex-1 flex flex-col relative w-full overflow-hidden">
        {selectedUser && window.innerWidth < 768 && !showSidebar && (
          <button
            onClick={handleBack}
            className="absolute top-4 right-4 z-30 p-3 sm:p-4 rounded-full text-white bg-[#020617]"
          >
            <MdArrowBack size={18} />
          </button>
        )}

        {!selectedUser ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-white text-gray-500 gap-4 px-4 text-center">
            {/* Logo */}
            <div className="p-4 bg-red-50 rounded-full shadow-sm">
              <img
                src="/logo.svg"
                alt="logo"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800">
              Choose a conversation
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-gray-400 text-center max-w-xs">
              Select a user from the sidebar to start chatting and see messages
              here.
            </p>
          </div>
        ) : (
          <>
            <ChatHeader
              selectedUser={selectedUser}
              onlineUsers={onlineUsers}
              typingUserId={typingUserId}
              navigate={navigate}
            />

            <MessageList
              messages={messages}
              user={user!}
              deleteMessage={deleteMessage}
              token={token as string}
            />

            <ChatInput
              message={message}
              setMessage={setMessage}
              handleSend={handleSend}
              handleTyping={handleTyping}
              handleImageChange={handleImageChange}
              showEmoji={showEmoji}
              setShowEmoji={setShowEmoji}
            />
          </>
        )}
      </main>
    </div>
    </ProtectedRoute>
  );
};

export default Messaging;
