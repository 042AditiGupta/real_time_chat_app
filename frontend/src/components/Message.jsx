import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Function to format the real time
  const formatTime = (timeStamp) => {
    if (!timeStamp) return "";
    const date = new Date(timeStamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isSender = message?.senderId === authUser?._id;

  return (
    <div
      ref={scroll}
      className={`chat px-2 sm:px-3 ${isSender ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="w-8 sm:w-10 rounded-full border border-gray-600">
          <img
            alt="Profile"
            src={isSender ? authUser?.profilePhoto : selectedUser?.profilePhoto}
          />
        </div>
      </div>

      <div className="chat-header">
        <time className="text-[10px] sm:text-xs opacity-70 text-white ml-1">
          {formatTime(message?.createdAt)}
        </time>
      </div>

      <div
        className={`chat-bubble shadow-md max-w-[75%] sm:max-w-xs md:max-w-sm break-words px-4 py-3 ${
          message?.senderId === authUser?._id
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        <span className="text-base sm:text-lg leading-relaxed">
          {message?.message}
        </span>
      </div>
    </div>
  );
};

export default Message;
