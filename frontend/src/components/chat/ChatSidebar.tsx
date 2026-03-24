"use client";
import { useState } from "react";
import {
  FaEllipsisV,
  FaSignOutAlt,
  FaUserCircle,
  FaArrowUp,
} from "react-icons/fa";
import type { IUser } from "../../types/user";
import { Link } from "react-router-dom";

interface SidebarProps {
  users: IUser[];
  search: string;
  setSearch: (v: string) => void;
  selectedUser: IUser | null;
  onlineUsers: string[];
  selectUser: (user: IUser) => void;
  user: IUser;
  logout: () => void;
}

export default function ChatSidebar({
  users,
  search,
  setSearch,
  selectedUser,
  onlineUsers,
  selectUser,
  user,
  logout,
}: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <aside className="bg-white border-r w-full   flex flex-col h-full md:h-auto fixed md:relative z-20">
      {/* HEADER (New UI) */}
      <div className="p-4 border-b flex items-center justify-between bg-red-50">
        <div className="flex-1 flex items-center gap-2 overflow-y-auto p-2 space-y-2 custom-scroll">
          <img
            src={user?.avatar as string}
            className="w-8 h-8 rounded-full object-cover border border-red-400"
          />
          <span className="text-sm font-semibold text-gray-700">
            {user?.fullname}
          </span>
        </div>

        <div className="relative">
          <button onClick={() => setOpen(!open)}>
            <FaEllipsisV />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg overflow-hidden z-10">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm"
              >
                <FaUserCircle />
                Profile
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-red-50 text-red-500 text-sm"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <input
          className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-red-400 outline-none"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* USERS COUNT (NEW UI ELEMENT) */}
      <div className="px-3 text-xs text-gray-400 mb-1">
        {users.length} users
      </div>

      {/* USERS LIST */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scroll">
        {users.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-10">
            No users found
          </div>
        )}

        {users
          .filter((u) =>
            u.fullname.toLowerCase().includes(search.toLowerCase()),
          )
          .map((u) => {
            const active = selectedUser?._id === u._id;

            return (
              <div
                key={u._id}
                onClick={() => selectUser(u)}
                className={`
                  group flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition
                  hover:shadow-md hover:scale-[1.01]
                  ${
                    active
                      ? "bg-red-100 border-red-300"
                      : "hover:bg-gray-50 border-transparent"
                  }
                `}
              >
                {/* Avatar */}
                <img
                  src={u.avatar as string}
                  className="w-10 h-10 rounded-full object-cover group-hover:ring-2 ring-red-400 transition"
                />

                {/* Name */}
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{u.fullname}</p>
                </div>

                {/* Online */}
                {onlineUsers.includes(u._id as string) && (
                  <span className="w-2 h-2 bg-green-500 rounded-full shadow-md"></span>
                )}
              </div>
            );
          })}
      </div>

      {/* FLOATING BACK TO TOP (NEW UNUSED UX ELEMENT) */}
      <button
        onClick={() =>
          document.querySelector(".custom-scroll")?.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
      >
        <FaArrowUp size={14} />
      </button>
    </aside>
  );
}
