import { UserRoles, type IUser } from "../../types/user";
import type { IComment } from "../../types/comment";
import { Link } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import type { IReply } from "../../types/reply";
import { FiSend } from "react-icons/fi";
import {
  getUserAvatar,
  getUserName,
  isUserObject,
} from "../../functions/helpers";

interface PropCommentsSection {
  comments: IComment[];
  currentUser: IUser | null;
  updateComment: (cId: string) => void;
  deleteComment: (cId: string) => void;
  replies: Record<string, IReply[]>;
  deleteReply: (rId: string) => void;
  createReply: (cId: string, text: string) => void;
  replyInputs: Record<string, string>;
  setReplyInputs: (replyInputs: Record<string, string>) => void;
  editId: string | null;
  setEditId: (id: string | null) => void;
  editText: string;
  setEditText: (text: string) => void;
  onlineUsers: string[];
}

const CommentsSection = ({
  comments,
  currentUser,
  updateComment,
  deleteComment,
  replies,
  deleteReply,
  createReply,
  replyInputs,
  setReplyInputs,
  editId,
  setEditId,
  editText,
  setEditText,
  onlineUsers,
}: PropCommentsSection) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-3 pr-1">
      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-100 p-3 rounded-lg">
          {/* USER */}
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-3 mb-5">
              {isUserObject(comment.userId) && (
                <Link
                  to={`/user/${comment.userId._id}`}
                  className="relative inline-block"
                >
                  <img
                    src={getUserAvatar(comment.userId)}
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover"
                  />

                  {/* Online Dot */}
                  {onlineUsers.includes(comment.userId._id as string) && (
                    <span
                      className="
          absolute -bottom-1 -right-1/4
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
              )}

              <p className="text-xs font-semibold text-gray-800">
                {getUserName(comment.userId)}
              </p>
            </div>

            {isUserObject(comment.userId) && currentUser && (
              <div className="flex gap-2 text-gray-500">
                {comment.userId._id === currentUser._id && (
                  <button
                    onClick={() => {
                      setEditId(comment._id!);
                      setEditText(comment.text);
                    }}
                  >
                    <FaPen size={10} />
                  </button>
                )}

                {(comment.userId._id === currentUser._id ||
                  currentUser.role === UserRoles.ADMIN) && (
                  <button onClick={() => deleteComment(comment._id)}>
                    <FaTrash size={10} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* TEXT */}
          {editId === comment._id ? (
            <div className="flex gap-2 mb-2">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />

              <button
                onClick={() => updateComment(comment._id)}
                className="bg-green-500 text-white px-2 rounded text-xs"
              >
                Save
              </button>

              <button
                onClick={() => setEditId(null)}
                className="bg-gray-400 text-white px-2 rounded text-xs"
              >
                Cancel
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-700 mb-2">{comment.text}</p>
          )}

          {/* REPLIES */}
          <div className="ml-2 space-y-1">
            {replies[comment._id]?.length > 0 &&
              replies[comment._id].map((reply: IReply) => (
                <div
                  key={reply._id}
                  className="text-xs bg-white p-2 rounded-md flex justify-between border"
                >
                  <div className="flex items-center gap-2">
                    {isUserObject(reply.userId) && (
                      <Link
                        to={`/user/${reply.userId._id}`}
                        className="relative inline-block"
                      >
                        <img
                          src={getUserAvatar(reply.userId)}
                          alt="avatar"
                          className="w-5 h-5 rounded-full object-cover"
                        />

                        {/* Online Dot */}
                        {onlineUsers.includes(reply.userId._id as string) && (
                          <span
                            className="
          absolute -bottom-1 -right-1/4
          -translate-x-1/2
          w-2.5 h-2.5
          bg-[lime]
          border border-white
          rounded-full
          shadow-[0_0_8px_rgba(132,204,22,0.9)]
          animate-pulse
        "
                          />
                        )}
                      </Link>
                    )}

                    <span>
                      <b>{getUserName(reply.userId)}</b>: {reply.text}
                    </span>
                  </div>

                  {isUserObject(reply.userId) &&
                    reply.userId._id === currentUser?._id && (
                      <button onClick={() => deleteReply(reply._id!)}>✖</button>
                    )}
                </div>
              ))}
          </div>

          {/* REPLY INPUT */}
          {isUserObject(comment.userId) &&
            currentUser &&
            comment.userId._id !== currentUser._id && (
              <div className="flex gap-1 mt-2">
                <input
                  type="text"
                  placeholder="Reply..."
                  value={replyInputs[comment._id] || ""}
                  onChange={(e) =>
                    setReplyInputs({
                      ...replyInputs,
                      [comment._id]: e.target.value,
                    })
                  }
                  className="flex-1 bg-white border p-2 rounded-md text-xs outline-none"
                />

                <button
                  onClick={() =>
                    createReply(comment._id!, replyInputs[comment._id])
                  }
                  className="bg-[red] text-white px-2 rounded-md"
                >
                  <FiSend size={14} />
                </button>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
