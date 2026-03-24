import { FaSmile } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

export interface ChatInputProps {
  message: string;
  setMessage: (v: string) => void;
  handleSend: () => void;
  handleTyping: (v: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showEmoji: boolean;
  setShowEmoji: (v: boolean) => void;
}

export default function ChatInput({
  message,
  setMessage,
  handleSend,
  handleTyping,
  handleImageChange,
  showEmoji,
  setShowEmoji,
}: ChatInputProps) {
  const onEmojiClick = (emojiObject: any) => {
    setMessage(message + emojiObject.emoji);
  };

  return (
    <div className="bg-white border-t px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
      {/* Attach */}
      <label className="p-3 rounded-full bg-gray-100 hover:bg-red-50 text-gray-600 cursor-pointer">
        <IoMdImages />
        <input type="file" hidden onChange={handleImageChange} />
      </label>

      {/* Emoji */}
      <div className="relative">
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className="p-3 rounded-full bg-gray-100 hover:bg-red-50"
        >
          {showEmoji ? <MdOutlineCancel /> : <FaSmile />}
        </button>

        {showEmoji && (
          <div className="absolute bottom-12 z-20">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>

      {/* Input */}
      <input
        className="flex-1 min-w-0 border rounded-full px-3 sm:px-4 py-2 sm:py-3 text-sm focus:ring-2 focus:ring-red-400 outline-none"
        placeholder="Write a message..."
        value={message}
        onChange={(e) => handleTyping(e.target.value)}
      />

      {/* Send */}
      <button
        onClick={handleSend}
        className="bg-[red] text-white px-4 sm:px-5 py-2 sm:py-3 rounded-full hover:bg-[#ff1818] transition"
      >
        <IoSend />
      </button>
    </div>
  );
}
