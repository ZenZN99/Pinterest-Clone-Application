import type { IPin } from "../../types/pin";

interface PropFeaturedPin {
  pin: IPin;
}

const FeaturedPin = ({ pin }: PropFeaturedPin) => {
  return (
    <div className="relative rounded-3xl overflow-hidden group">
      <img
        src={pin.image as string}
        className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-6">
        <div>
          <h2 className="text-2xl font-bold hover:text-white transition">
            {pin.title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPin;
