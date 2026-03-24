import type { Dispatch, FormEvent, SetStateAction } from "react";
import { FiSend } from "react-icons/fi";

interface PropAddComment {
  text: string;
  setNewCommentText: Dispatch<SetStateAction<string>>;
  createComment: (e: FormEvent) => void;
}

const AddComment = ({
  text,
  setNewCommentText,
  createComment,
}: PropAddComment) => {
  return (
    <div className="mt-3 flex gap-2">
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setNewCommentText(e.target.value)}
        className="flex-1 bg-gray-100 p-2 rounded-lg text-sm outline-none"
      />

      <button
        onClick={createComment}
        className="bg-[red] text-white px-3 rounded-lg"
      >
        <FiSend />
      </button>
    </div>
  );
};

export default AddComment;
