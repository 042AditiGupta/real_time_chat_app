import React, { useState, useEffect, useRef } from 'react';
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const pickerRef = useRef(null);

    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showEmojiPicker &&
                pickerRef.current &&
                !pickerRef.current.contains(event.target)
            ) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showEmojiPicker]);

    const handleEmojiClick = (emojiData) => {
        setMessage((prev) => prev + emojiData.emoji);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        try {
            const res = await axios.post(
                `${BASE_URL}/api/v1/message/send/${selectedUser?._id}`,
                { message },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            dispatch(setMessages([...messages, res?.data?.newMessage]));
            setMessage("");
            setShowEmojiPicker(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="px-2 sm:px-4 my-2 sm:my-3 relative"
        >
            <div ref={pickerRef}>

                {showEmojiPicker && (
                    <div className="absolute bottom-14 sm:bottom-16 left-2 sm:left-4 z-50 shadow-2xl max-w-[calc(100vw-1rem)] sm:max-w-none overflow-hidden">
                        <EmojiPicker
                            theme="auto"
                            onEmojiClick={handleEmojiClick}
                            width={300}
                            height={400}
                            skinTonesDisabled
                            searchDisabled={false}
                        />
                    </div>
                )}

                <div className="w-full relative flex items-center gap-2">

                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className={`transition-colors flex-shrink-0 ${
                            showEmojiPicker
                                ? 'text-yellow-400'
                                : 'text-zinc-600 dark:text-slate-300 hover:text-yellow-400'
                        }`}
                    >
                        <BsEmojiSmile className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <div className="relative flex-1">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onFocus={() => setShowEmojiPicker(false)}
                            type="text"
                            placeholder="Send a message..."
                            className="border text-xs sm:text-sm rounded-full block w-full p-2.5 sm:p-3 pr-10 sm:pr-12 bg-white border-zinc-300 text-black placeholder-zinc-500 dark:bg-white/10 dark:border-white/10 dark:text-white dark:placeholder-slate-400 outline-none focus:border-sky-500 backdrop-blur-sm"
                        />

                        <button
                            type="submit"
                            className="absolute flex inset-y-0 end-0 items-center pr-3 sm:pr-4 text-sky-500 hover:text-sky-400"
                        >
                            <IoSend className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default SendInput;