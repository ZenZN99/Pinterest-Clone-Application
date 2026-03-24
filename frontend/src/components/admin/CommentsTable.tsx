import { Link } from "react-router-dom";
import type { IComment } from "../../types/comment";
import { FaTrash, FaComment } from "react-icons/fa";
import { getUserAvatar, isUserObject } from "../../functions/helpers";
import { FaPencil } from "react-icons/fa6";
import CommentsTableSkeleton from "../skeletons/CommentsTableSkeleton";

interface CommentsTableProps {
  comments: IComment[];
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
  loading: boolean;
  editText: string | null;
  setEditText: (text: string) => void;
  setEditId: (id: string | null) => void;
  editId: string | null;
}

const CommentsTable = ({
  comments,
  onDelete,
  onUpdate,
  loading,
  editText,
  setEditText,
  setEditId,
  editId,
}: CommentsTableProps) => {
  if (loading) return <CommentsTableSkeleton />;
  return (
    <div className="shadow p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 md:ml-64">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold">Comments List</h2>
        <span className="text-sm text-gray-400">Total: {comments.length}</span>
      </div>

      {comments.length === 0 ? (
        <div className="text-center py-10 text-gray-400 flex items-center justify-center gap-3">
          No comments found <FaComment className="text-2xl" />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-white/10 text-gray-400 text-sm uppercase">
                <tr>
                  <th className="py-4">User</th>
                  <th>Comment</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-300">
                {comments.map((comment) => (
                  <tr
                    key={comment._id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    {/* User */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border-2 border-[red] flex items-center justify-center font-bold">
                          {isUserObject(comment.userId) && (
                            <Link to={`/user/${comment.userId._id}`}>
                              <img
                                src={getUserAvatar(comment.userId)}
                                alt="user"
                                className="w-8 h-8 rounded-full"
                              />
                            </Link>
                          )}
                        </div>

                        <div>
                          <p className="font-medium">
                            {typeof comment.userId === "object"
                              ? comment.userId.fullname
                              : "User"}
                          </p>
                          <p className="text-sm text-gray-500">
                            ID: {comment._id?.slice(0, 6)}...
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Comment Text */}
                    <td className="text-gray-400 max-w-[400px]">
                      {editId === comment._id ? (
                        <div className="flex gap-2">
                          <input
                            value={editText || ""}
                            onChange={(e) => setEditText(e.target.value)}
                            className="border p-1 text-sm"
                          />

                          <button
                            onClick={() => {
                              if (!editText?.trim()) return;
                              onUpdate(comment._id!);
                            }}
                            className="bg-green-500 text-white px-2 text-xs rounded"
                          >
                            Save
                          </button>

                          <button
                            onClick={() => setEditId(null)}
                            className="bg-gray-400 text-white px-2 text-xs rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <p className="truncate">{comment.text}</p>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => {
                            setEditId(comment._id!);
                            setEditText(comment.text);
                          }}
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                        >
                          <FaPencil />
                        </button>

                        <button
                          onClick={() => onDelete(comment._id!)}
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
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="shadow p-4 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full border-2 border-[red] flex items-center justify-center font-bold">
                    {isUserObject(comment.userId) && (
                      <Link to={`/user/${comment.userId._id}`}>
                        <img
                          src={getUserAvatar(comment.userId)}
                          alt="user"
                          className="w-8 h-8 rounded-full"
                        />
                      </Link>
                    )}
                  </div>

                  <p className="font-medium">
                    {typeof comment.userId === "object"
                      ? comment.userId.fullname
                      : "User"}
                  </p>
                </div>

                <p className="text-sm text-gray-400 mb-3">{comment.text}</p>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditId(comment._id);
                      setEditText(comment.text);
                    }}
                  >
                    <FaPencil />
                  </button>

                  <button
                    onClick={() => onDelete(comment._id!)}
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

export default CommentsTable;
