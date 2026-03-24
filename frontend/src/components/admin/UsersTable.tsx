import type { IUser } from "../../types/user";
import { FaTrash, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import UsersTableSkeleton from "../skeletons/UserTableSkeleton";

interface UsersTableProps {
  users: IUser[];
  loading: boolean;
  onDelete: (id: string) => void;
  onlineUsers: string[];
}

const UsersTable = ({
  users,
  loading,
  onDelete,
  onlineUsers,
}: UsersTableProps) => {
  if (loading) return <UsersTableSkeleton />;
  return (
    <div className="shadow p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 md:ml-64">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold">Users List</h2>
        <span className="text-sm text-gray-400">Total: {users.length}</span>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-10 text-gray-400 flex items-center justify-center gap-3">
          No users found <FaUsers className="text-2xl" />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-white/10 text-gray-400 text-sm uppercase">
                <tr>
                  <th className="py-4">User</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-300">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="py-4 flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full border-2 border-[red] flex items-center justify-center font-bold  transition-all duration-300 hover:scale-110">
                        <div className="relative w-10 h-10 rounded-full border-2 border-[red] flex items-center justify-center font-bold transition-all duration-300 hover:scale-110">
                          {user.avatar ? (
                            <Link
                              to={`/user/${user._id}`}
                              className="relative block w-full h-full"
                            >
                              <img
                                src={user.avatar}
                                alt={user.fullname}
                                className="rounded-full w-full h-full object-cover"
                              />

                              {/* Online Dot */}
                              {onlineUsers.includes(user._id as string) && (
                                <span
                                  className="
            absolute -bottom-1 -right-2
            -translate-x-1/2
            w-3 h-3
            bg-[lime]
            border-2 border-white
            rounded-full
            shadow-[0_0_10px_rgba(132,204,22,0.9)]
            animate-pulse
          "
                                />
                              )}
                            </Link>
                          ) : (
                            user.fullname.charAt(0)
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="font-medium">{user.fullname}</p>
                        <p className="text-sm text-gray-500">
                          ID: {user._id!.slice(0, 6)}...
                        </p>
                      </div>
                    </td>

                    <td className="text-gray-500">{user.email}</td>

                    <td>
                      <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs">
                        Active
                      </span>
                    </td>

                    <td className="text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => onDelete(user._id as string)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="flex flex-col gap-4 md:hidden">
            {users.map((user) => (
              <div
                key={user._id}
                className="shadow p-3 sm:p-4 rounded-xl border border-white/10"
              >
                <div className="flex gap-3 sm:gap-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[red] flex items-center justify-center font-bold transition-all duration-300 hover:scale-110">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[red] flex items-center justify-center font-bold transition-all duration-300 hover:scale-110">
                      {user.avatar ? (
                        <Link
                          to={`/user/${user._id}`}
                          className="relative block w-full h-full"
                        >
                          <img
                            src={user.avatar}
                            alt={user.fullname}
                            className="rounded-full w-full h-full object-cover"
                          />

                          {/* Online Dot */}
                          {onlineUsers.includes(user._id as string) && (
                            <span
                              className="
            absolute -bottom-1  -right-2
            -translate-x-1/2
            w-3 h-3
            bg-[lime]
            border-2 border-white
            rounded-full
            shadow-[0_0_10px_rgba(132,204,22,0.9)]
            animate-pulse
          "
                            />
                          )}
                        </Link>
                      ) : (
                        user.fullname.charAt(0)
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-white text-sm sm:text-base">
                      {user.fullname}
                    </p>
                    <p className="text-xs text-gray-500 sm:text-sm">
                      ID: {user._id!.slice(0, 6)}...
                    </p>
                    <p className="text-xs text-gray-500 sm:text-sm">
                      {user.email}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs sm:text-sm">
                        Active
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onDelete(user._id as string)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UsersTable;
