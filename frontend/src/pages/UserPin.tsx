import { usePins } from "../hooks/usePins";
import UserPinSkeleton from "../components/skeletons/UserPinSkeleton";
import { useNavigate } from "react-router-dom";
import PinsSidebar from "../components/pins/PinsSidebar";
import FeaturedPin from "../components/pins/FeaturedPin";
import PinsGrid from "../components/pins/PinsGrid";
import ProtectedRoute from "../routes/ProtectedRoute";

const UserPin = () => {
  const {
    formPin,
    setFormPin,
    pins,
    loadingPin,
    editPinId,
    createPin,
    updatePin,
    deletePin,
    ChangePin,
    setEditPinId,
  } = usePins();

  const navigate = useNavigate();

  if (loadingPin) return <UserPinSkeleton />;

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          <PinsSidebar
            form={formPin}
            setForm={setFormPin}
            handleChange={ChangePin}
            handleCreate={createPin}
            handleUpdate={updatePin}
            editPinId={editPinId}
          />

          <div className="col-span-12 md:col-span-9 space-y-6">
            {pins.length > 0 && <FeaturedPin pin={pins[0]} />}

            <PinsGrid
              pins={pins}
              setForm={setFormPin}
              handleDelete={deletePin}
              navigate={navigate}
              setEditPinId={setEditPinId}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserPin;
