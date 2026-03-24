import { useEffect, useState } from "react";
import type { IPin } from "../types/pin";
import { getAllPins } from "../apis/pin.api";
import { FiEye } from "react-icons/fi";
import MainSkeleton from "../components/skeletons/MainSkeleton";
import { Link, useSearchParams } from "react-router-dom";
import PinEmpty from "../components/PinEmpty";
import ProtectedRoute from "../routes/ProtectedRoute";

const Main = () => {
  const [pins, setPins] = useState<IPin[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const token = localStorage.getItem("token") as string;

  const search = searchParams.get("search") || "";

  const filteredPins = pins.filter((pin) =>
    pin.title.toLowerCase().includes(search.toLowerCase()),
  );

  const fetchPins = async () => {
    setLoading(true);
    const data = await getAllPins(token);
    setPins(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPins();
  }, []);

  if (loading) return <MainSkeleton />;
  if (filteredPins.length === 0) return <PinEmpty />;
  return (
    <ProtectedRoute>
      <div className="p-6 mt-20">
        {/*  Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredPins.map((pin) => (
            <Link to={`/pin/${pin._id}`}>
              <div
                key={pin._id}
                className="relative group break-inside-avoid rounded-2xl m-2 overflow-hidden cursor-pointer"
              >
                {/*  Image */}
                {pin.image && (
                  <img
                    src={pin.image}
                    alt={pin.title}
                    className="w-full object-cover transition duration-300 group-hover:brightness-75"
                  />
                )}

                {/*  Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
                  <FiEye className="text-white text-3xl" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Main;
