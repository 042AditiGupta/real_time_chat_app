import React, { useState, useEffect, useRef } from 'react';
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { pushMessage } from '../redux/messageSlice';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const pickerRef = useRef(null);

    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);

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
            const res = await axios.post(`/api/v1/message/send/${selectedUser?._id}`, { message });
            dispatch(pushMessage(res?.data?.newMessage));
            
            setMessage("");
            setShowEmojiPicker(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="px-3 sm:px-4 py-2 sm:py-3 relative bg-white dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800/80 transition-colors duration-300"
        >
            <div ref={pickerRef}>

                {/* 🌟 UPDATED: Rounded and shadowed Emoji Picker drop-up wrapper */}
                {showEmojiPicker && (
                    <div className="absolute bottom-16 sm:bottom-20 left-3 sm:left-4 z-50 shadow-2xl rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 max-w-[calc(100vw-2rem)] sm:max-w-none">
                        <EmojiPicker
                            theme="auto"
                            onEmojiClick={handleEmojiClick}
                            width={320}
                            height={380}
                            skinTonesDisabled
                            searchDisabled={false}
                        />
                    </div>
                )}

                <div className="w-full relative flex items-center gap-2.5">

                    {/* Emoji toggle face button */}
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className={`transition-all duration-200 flex-shrink-0 hover:scale-110 active:scale-95 ${
                            showEmojiPicker
                                ? 'text-amber-500 scale-110'
                                : 'text-slate-400 dark:text-zinc-500 hover:text-amber-500 dark:hover:text-amber-400'
                        }`}
                    >
                        <BsEmojiSmile className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* 🌟 UPDATED: Modern soft-tint input capsule with active focus enhancements */}
                    <div className="relative flex-1">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onFocus={() => setShowEmojiPicker(false)}
                            type="text"
                            placeholder="Type your message..."
                            className="text-sm rounded-2xl block w-full py-2.5 sm:py-3 pl-4 pr-10 sm:pr-12 bg-slate-100 border border-transparent text-slate-800 placeholder-slate-400 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 outline-none focus:border-sky-500 focus:bg-white dark:focus:bg-zinc-850 shadow-inner transition-all duration-200"
                        />

                        {/* Submit message paper airplane button */}
                        <button
                            type="submit"
                            disabled={!message.trim()}
                            className="absolute flex inset-y-0 end-0 items-center pr-3 sm:pr-4 text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all duration-150"
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