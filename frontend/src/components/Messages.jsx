import React from 'react';
import { useSelector } from 'react-redux';
import useGetMessages from '../hooks/useGetMessages'; 
import Message from './Message'; 

const Messages = () => {
    useGetMessages(); 

    const { messages } = useSelector((store) => store.message);

    return (
        // 🌟 UPDATED: Added a smooth scroll transition and padding utilities
        <div className="px-4 py-4 flex-1 overflow-y-auto space-y-4 transition-colors duration-300">
            {/* Loop through clean Redux array */}
            {messages && messages.map((message) => (
                <Message key={message?._id} message={message} />
            ))}
            
            {/* 🌟 UPDATED: Refined empty chat room history state view */}
            {(!messages || messages.length === 0) && (
                <div className="flex flex-col items-center justify-center text-center mt-16 animate-fade-in select-none">
                    <div className="text-3xl sm:text-4xl mb-2">👋</div>
                    <p className="text-sm font-bold text-slate-800 dark:text-zinc-200">
                        No messages yet
                    </p>
                    <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium mt-0.5">
                        Break the ice! Say hello to start the conversation.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Messages;