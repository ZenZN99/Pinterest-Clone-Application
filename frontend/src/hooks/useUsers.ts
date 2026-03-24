import { useEffect, useState } from "react";
import { UserRoles, type FormUser, type IUser } from "../types/user";
import { getAllUsers } from "../apis/user.api";
import toast from "react-hot-toast";
import { handleDeleteUser } from "../functions/users/handleDeleteUser";

export const useUsers = () => {
  const [formUser, setFormUser] = useState<FormUser>({
    fullname: "",
    bio: "",
    role: UserRoles.USER,
    avatar: null,
    cover: null,
  });
  const [users, setUsers] = useState<IUser[]>([]);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);

  const token = localStorage.getItem("token") as string;

  const fetchUsers = async () => {
    setLoadingUser(true);
    try {
      const data = await getAllUsers(token);
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoadingUser(false);
    }
  };

  const deleteUser = async (id: string) => {
    handleDeleteUser(id, token, fetchUsers);
  };

 

  const ChangeUser = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const target = e.target as HTMLInputElement;

      if (target.files && target.files.length > 0) {
        const file = target.files[0];

        setFormUser((prev) => ({
          ...prev,
          [name]: file,
        }));
      }

      return;
    }
    setFormUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loadingUser,
    formUser,
    setFormUser,
    fetchUsers,
    deleteUser,
    ChangeUser,
  };
};
