const PinInfo = ({ pin }: any) => {
  return (
    <div>
      <h1 className="text-lg font-bold text-gray-900 mb-1">{pin?.title}</h1>

      <p className="text-gray-600 text-sm mb-3">{pin?.content}</p>
    </div>
  );
};

export default PinInfo;
