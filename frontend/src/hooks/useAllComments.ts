import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllComments } from "../apis/comment.api";
import type { IComment } from "../types/comment";

export const useAllComments = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") as string;

  const fetchAllComments = async () => {
    setLoading(true);
    try {
      const data = await getAllComments(token);
      setComments(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  return {
    comments,
    loading,
    fetchAllComments,
  };
};