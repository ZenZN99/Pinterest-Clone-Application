import toast from "react-hot-toast";
import { deleteUserById } from "../../apis/user.api";
import { confirmDeleteToast } from "../../services/toast";

export const handleDeleteUser = (
  id: string,
  token: string,
  fetchUsers: () => void,
) => {
  confirmDeleteToast(async () => {
    try {
      const data = await deleteUserById(token, id);

      if (data?.message) {
        return toast.error(data.message);
      }

      toast.success("User Deleted Successfully");

      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  }, "Are you sure you want to delete this user?");
};
