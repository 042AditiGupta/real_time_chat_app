import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pushMessage } from "../redux/messageSlice"; // 🌟 Imported pushMessage instead of setMessages

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (!newMessage) return;

      // 🚀 Dispatch only the incoming single message.
      // Redux Toolkit safely pushes this to the latest state, eliminating the vanishing bug!
      dispatch(pushMessage(newMessage));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch]); 
};

export default useGetRealTimeMessage;