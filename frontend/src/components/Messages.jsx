import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';
import { useSelector } from "react-redux";

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();

    const { messages } = useSelector(store => store.message);

    const safeMessages = Array.isArray(messages)
        ? messages.filter((msg) => msg && msg._id)
        : [];

    return (
        <div className="px-2 sm:px-4 py-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {safeMessages.length > 0 ? (
                safeMessages.map((message) => (
                    <Message key={message._id} message={message} />
                ))
            ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-80">
                    <div className="p-4 rounded-full bg-zinc-200 dark:bg-gray-800/30 mb-2">
                        💬
                    </div>

                    <p className="text-center text-zinc-800 dark:text-white font-medium text-sm sm:text-base">
                        Start a conversation
                    </p>

                    <p className="text-xs text-zinc-500 dark:text-gray-400 mt-1">
                        Send a message to break the ice!
                    </p>
                </div>
            )}
        </div>
    );
};

export default Messages;