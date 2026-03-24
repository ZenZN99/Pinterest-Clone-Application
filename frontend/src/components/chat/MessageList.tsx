import { useEffect, useRef } from "react";
import { FaCheck, FaCheckDouble, FaTrash } from "react-icons/fa";
import type { Message } from "../../types/message";
import type { IUser } from "../../types/user";

export interface MessageListProps {
  messages: Message[];
  user: IUser;
  deleteMessage: (token: string, id: string) => void;
  token: string;
}

export default function MessageList({
  messages,
  user,
  deleteMessage,
  token,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-gray-50 space-y-4">
      {messages.map((msg) => {
        const isMe = msg.senderId === user._id;

        return (
          <div
            key={msg._id}
            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow text-sm relative
          ${isMe ? "bg-[red] text-white" : "bg-white border text-gray-800"}`}
            >
              {msg.image && (
                <img
                  src={msg.image as any}
                  className="rounded-xl mb-2 max-h-52 sm:max-h-60 w-full object-cover"
                />
              )}

              <p className="whitespace-pre-wrap break-words">{msg.content}</p>

              {isMe && (
                <button
                  onClick={() => deleteMessage(token, msg._id)}
                  className="absolute top-2 right-2 text-xs"
                >
                  <FaTrash />
                </button>
              )}

              <div className="flex items-center justify-end gap-1 text-[10px] mt-1 opacity-70">
                <span>
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                {isMe && (
                  <>
                    {msg.isRead ? (
                      <FaCheckDouble className="text-green-300 text-xs" />
                    ) : (
                      <FaCheck className="text-white/80 text-xs" />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
