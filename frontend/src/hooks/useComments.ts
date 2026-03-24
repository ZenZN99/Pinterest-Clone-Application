import { useEffect, useState, type FormEvent } from "react";
import type { IComment } from "../types/comment";
import type { IReply } from "../types/reply";
import { getCommentsByPin } from "../apis/comment.api";
import { getAllReplies, getRepliesByComment } from "../apis/reply.api";
import toast from "react-hot-toast";

import { handleCreateComment } from "../functions/comments/handleCreateComment";
import { handleUpdateComment } from "../functions/comments/handleUpdateComment";
import { handleDeleteComment } from "../functions/comments/handleDeleteComment";

import { handleCreateReply } from "../functions/replies/handleCreateReply";
import { handleDeleteReply } from "../functions/replies/handleDeleteReply";

export const useComments = (pinId: string) => {
  const [newCommentText, setNewCommentText] = useState("");
  const [editText, setEditText] = useState("");
  const [comments, setComments] = useState<IComment[]>([]);
  const [replies, setReplies] = useState<Record<string, IReply[]>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [loadingComment, setLoadingComment] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [repliesState, setRepliesState] = useState<IReply[]>([]);
  const token = localStorage.getItem("token") as string;



  const fetchAllReplies = async () => {
    setLoading(true);
    try {
      const data = await getAllReplies(token);
      setRepliesState(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch replies");
    } finally {
      setLoading(false);
    }
  };

  // Comment
  const fetchComments = async () => {
    setLoadingComment(true);
    try {
      const data = await getCommentsByPin(token, pinId);
      const commentsArray = Array.isArray(data) ? data : [];

      setComments(commentsArray);

      const repliesData: Record<string, IReply[]> = {};

      for (const c of commentsArray) {
        const r = await getRepliesByComment(c._id, token);
        repliesData[c._id] = r;
      }

      setReplies(repliesData);
    } catch (error) {
      toast.error("Failed to fetch comments");
    } finally {
      setLoadingComment(false);
    }
  };

  const createComment = (e: FormEvent) => {
    if (!token) return toast.error("You must log in first.");
    e.preventDefault();
    handleCreateComment(
      newCommentText,
      token,
      pinId,
      setNewCommentText,
      fetchComments,
      setLoadingComment,
    );
  };

  const updateComment = (commentId: string) => {
    if (!token) return toast.error("You must log in first.");

    handleUpdateComment(
      editText,
      token,
      commentId,
      setEditText,
      setEditId,
      fetchComments,
      setLoadingComment,
    );
  };

  const deleteComment = (id: string) => {
    if (!token) return toast.error("You must log in first.");
    handleDeleteComment(id, token, fetchComments);
  };

  //  Reply
  const createReply = (commentId: string, replyText: string) => {
    if (!token) return toast.error("You must log in first.");
    if (!replyText.trim()) return;

    handleCreateReply(
      replyText,
      token,
      commentId,
      () => {},
      fetchComments,
      setLoadingComment,
    );
  };

  const deleteReply = (replyId: string) => {
    if (!token) return toast.error("You must log in first.");
    handleDeleteReply(replyId, token, fetchComments);
  };

  useEffect(() => {
    if (pinId) fetchComments();
  }, [pinId]);

  useEffect(() => {
    fetchAllReplies();
  }, []);

  return {
    newCommentText,
    setNewCommentText,

    editText,
    setEditText,

    editId,
    setEditId,

    comments,
    replies,
    loadingComment,
    createComment,
    updateComment,
    deleteComment,
    createReply,
    deleteReply,
    loading,
    fetchAllReplies,
    repliesState,
    setComments,
    setLoading,
  };
};
