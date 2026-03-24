import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { Link } from "react-router-dom";
import { getUserAvatar } from "../functions/helpers";
import { FaUsers } from "react-icons/fa";
import UsersSkeleton from "../components/skeletons/UsersSkeleton";
import { useChatStore } from "../stores/useChatStore";
import ProtectedRoute from "../routes/ProtectedRoute";

const Users = () => {
  const { users, loadingUser } = useUsers();
  const [search, setSearch] = useState("");
  const { onlineUsers } = useChatStore();

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (loadingUser) return <UsersSkeleton />;

  return (
    <ProtectedRoute>
      <div className="p-6 md:p-10 md:ml-64 mt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaUsers /> Users
          </h1>

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E60023]"
          />
        </div>

        {/* Empty */}
        {!loadingUser && filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 py-10">No users found</div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-xl transition"
            >
              {/* User Avatar */}
              <div className="flex flex-col items-center text-center">
                <div className="relative inline-block">
                  <Link to={`/user/${user._id}`}>
                    <img
                      src={getUserAvatar(user)}
                      className="w-20 h-20 rounded-full border-2 border-[#E60023]"
                    />
                  </Link>

                  {/* Online Dot */}
                  {onlineUsers.includes(user._id as string) && (
                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-[lime] border-2 border-white rounded-full shadow-[0_0_8px_rgba(132,204,22,0.9)]" />
                  )}
                </div>

                {/* Name */}
                <h2 className="mt-3 font-semibold text-lg">{user.fullname}</h2>

                {/* Email */}
                <p className="text-sm text-gray-500 break-all">{user.email}</p>

                {/* ID */}
                <p className="text-xs text-gray-400 mt-1">Role: {user.role}</p>

                {/* Joined */}
                <p className="text-xs text-gray-400 mt-1">
                  Joined:{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Users;
