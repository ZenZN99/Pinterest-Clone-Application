import type { JSX } from "react";
import { FaHome, FaUsers, FaImage } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

export type TabKey = "dashboard" | "pins" | "users" | "comments" | "replies";

interface SidebarProps {
  activeTab: TabKey;
  setActiveTab: (key: TabKey) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menu: { title: string; icon: JSX.Element; key: TabKey }[] = [
    { title: "Home", icon: <FaHome />, key: "dashboard" },
    { title: "Users", icon: <FaUsers />, key: "users" },
    { title: "Pins", icon: <FaImage />, key: "pins" },
    { title: "Comments", icon: <FaMessage />, key: "comments" },
    { title: "Replies", icon: <FaMessage />, key: "replies" },
  ];

  return (
    <>
      <aside className="shadow bg-white fixed top-0 left-0 h-screen w-64  border-r border-white/10 p-6 hidden lg:flex flex-col z-50">
        <h2 className="text-2xl font-bold text-[red] mb-10">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          {menu.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition w-full text-left ${
                activeTab === item.key
                  ? "bg-[red] text-white"
                  : "hover:bg-white/10 text-gray-500"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.title}
            </button>
          ))}
        </nav>
      </aside>

      <div className="shadow bg-white fixed bottom-0 left-0 w-full  border-t border-white/10 flex justify-around items-center py-2 lg:hidden z-50">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex flex-col items-center text-xs transition p-2 rounded ${
              activeTab === item.key
                ? "bg-[red] text-white"
                : "text-gray-400 hover:bg-white/10"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
