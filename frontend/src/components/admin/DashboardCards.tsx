import { FaUser, FaImage, FaComment, FaReply } from "react-icons/fa";
import DashboardCardsSkeleton from "../skeletons/DashboardCardsSkeleton";

interface DashboardCardsProps {
  pinsCount: number;
  usersCount: number;
  commentsCount: number;
  repliesCount: number;
  loading: boolean;
}

const DashboardCards = ({
  pinsCount,
  usersCount,
  commentsCount,
  repliesCount,
  loading,
}: DashboardCardsProps) => {
  const cards = [
    { title: "Total Pins", value: pinsCount, icon: <FaImage /> },
    { title: "Total Users", value: usersCount, icon: <FaUser /> },
    { title: "Total Comments", value: commentsCount, icon: <FaComment /> },
    { title: "Total Replies", value: repliesCount, icon: <FaReply /> },
  ];

  if (loading) return <DashboardCardsSkeleton />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:ml-64 p-4 sm:p-6 lg:p-0">
      {cards.map((card, i) => (
        <div
          key={i}
          className="shadow p-4 sm:p-6 rounded-xl border border-white/10 hover:border-[red] transition flex items-center gap-4"
        >
          <div className="bg-[red] p-3 sm:p-4 rounded-full text-white text-2xl flex items-center justify-center">
            {card.icon}
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold">{card.value}</h3>
            <p className="text-gray-400 text-sm sm:text-base">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
