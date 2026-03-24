import { Link } from "react-router-dom";
import type { IReply } from "../../types/reply";
import { FaTrash } from "react-icons/fa";
import { getUserAvatar, isUserObject } from "../../functions/helpers";
import RepliesTableSkeleton from "../skeletons/RepliesTableSkeleton";

interface RepliesTableProps {
  repliesState: IReply[]; 
  onDelete: (id: string) => void;
  loading: boolean;
}

const RepliesTable = ({ repliesState, onDelete, loading }: RepliesTableProps) => {
  if (loading) return <RepliesTableSkeleton />;
  return (
    <div className="shadow p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 md:ml-64">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold">Replies List</h2>
        <span className="text-sm text-gray-400">
          Total: {repliesState.length}
        </span>
      </div>

      {repliesState.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No replies found
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-white/10 text-gray-400 text-sm uppercase">
                <tr>
                  <th className="py-4">User</th>
                  <th>Reply</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-300">
                {repliesState.map((reply) => (
                  <tr
                    key={reply._id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    {/* User */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border-2 border-[red] flex items-center justify-center font-bold">
                          {isUserObject(reply.userId) && (
                            <Link to={`/user/${reply.userId._id}`}>
                              <img
                                src={getUserAvatar(reply.userId)}
                                alt="user"
                                className="w-8 h-8 rounded-full"
                              />
                            </Link>
                          )}
                        </div>

                        <div>
                          <p className="font-medium">
                            {typeof reply.userId === "object"
                              ? reply.userId.fullname
                              : "User"}
                          </p>
                          <p className="text-sm text-gray-500">
                            ID: {reply._id?.slice(0, 6)}...
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Reply Text */}
                    <td className="text-gray-400 max-w-[400px]">
                      <p className="truncate">{reply.text}</p>
                    </td>

                    {/* Actions */}
                    <td className="text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => onDelete(reply._id!)}
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

          {/* Mobile Cards */}
          <div className="flex flex-col gap-4 md:hidden">
            {repliesState.map((reply) => (
              <div
                key={reply._id}
                className="shadow p-4 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full border-2 border-[red] flex items-center justify-center font-bold">
                    {isUserObject(reply.userId) && (
                      <Link to={`/user/${reply.userId._id}`}>
                        <img
                          src={getUserAvatar(reply.userId)}
                          alt="user"
                          className="w-8 h-8 rounded-full"
                        />
                      </Link>
                    )}
                  </div>

                  <p className="font-medium">
                    {typeof reply.userId === "object"
                      ? reply.userId.fullname
                      : "User"}
                  </p>
                </div>

                <p className="text-sm text-gray-400 mb-3">
                  {reply.text}
                </p>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onDelete(reply._id!)}
                    className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-sm"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RepliesTable;