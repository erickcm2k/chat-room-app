import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  // const socket = useMemo(
  //   () => io.connect(serverPath, { transports: ["websocket"] }),
  //   [serverPath]
  // );
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  const connectSocket = useCallback(() => {
    const socketTemp = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
    });
    setSocket(socketTemp);
  }, [serverPath]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => setOnline(false));
  }, [socket]);

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
  };
};
