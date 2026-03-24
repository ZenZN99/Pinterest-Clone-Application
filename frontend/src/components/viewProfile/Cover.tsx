import type { IUser } from "../../types/user";

interface PropsCover {
  user: IUser;
}

const Cover = ({ user }: PropsCover) => {
  return (
    <div className="relative w-full h-64 bg-gray-300">
      {user?.cover ? (
        <img src={user.cover} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-600">
          No Cover Image
        </div>
      )}
    </div>
  );
};

export default Cover;
