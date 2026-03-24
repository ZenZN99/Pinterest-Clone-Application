import { io, Socket } from "socket.io-client";
import { BACKEND_URL } from "../apis/user.api";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(BACKEND_URL, {
  transports: ["websocket"],
  auth: {
    token: localStorage.getItem("token"),
  },
  autoConnect: true,
});

  }
  return socket;
};