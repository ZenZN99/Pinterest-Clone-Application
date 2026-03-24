import { useState, useEffect, type FormEvent } from "react";
import toast from "react-hot-toast";
import { PinCategorys, type FormPin, type IPin } from "../types/pin";
import { handleUpdatePin } from "../functions/pins/handleUpdatePin";
import { handleCreatePin } from "../functions/pins/handleCreatePin";
import { handleDeletePin } from "../functions/pins/handleDeletePin";
import { getUserPins } from "../apis/pin.api";

export const usePins = () => {
  const [formPin, setFormPin] = useState<FormPin>({
    title: "",
    content: "",
    image: null,
    category: PinCategorys.NATURE,
  });

  const [pins, setPins] = useState<IPin[]>([]);
  const [editPinId, setEditPinId] = useState<string | null>(null);
  const [loadingPin, setLoadingPin] = useState<boolean>(false);

  const token = localStorage.getItem("token") as string;

  const fetchPins = async () => {
    setLoadingPin(true);
    try {
      const data = await getUserPins(token);
      setPins(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch pins");
    } finally {
      setLoadingPin(false);
    }
  };

  const createPin = (e: FormEvent) => {
    e.preventDefault();

    handleCreatePin(
      formPin as IPin,
      token,
      setFormPin,
      fetchPins,
      setLoadingPin,
    );
  };

  const updatePin = () => {
    handleUpdatePin(
      editPinId,
      formPin as IPin,
      token,
      setFormPin,
      setEditPinId,
      fetchPins,
      setLoadingPin,
    );
  };

  const deletePin = (id: string) => {
    handleDeletePin(id, token, fetchPins);
  };

  const ChangePin = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "image") {
      const target = e.target as HTMLInputElement;

      if (target.files && target.files.length > 0) {
        setFormPin((prev) => ({
          ...prev,
          image: target.files![0],
        }));
      }
      return;
    }

    setFormPin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchPins();
  }, []);

  return {
    formPin,
    setFormPin,
    pins,
    loadingPin,
    editPinId,
    setEditPinId,
    createPin,
    updatePin,
    deletePin,
    ChangePin,
    fetchPins,
  };
};
