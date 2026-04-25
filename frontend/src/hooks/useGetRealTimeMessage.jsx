import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();

  const messagesRef = useRef([]);

  useEffect(() => {
    messagesRef.current = messages || [];
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      dispatch(setMessages([...messagesRef.current, newMessage]));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch]);
};

export default useGetRealTimeMessage;