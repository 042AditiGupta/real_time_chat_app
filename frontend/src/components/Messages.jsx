import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/api/v1/message/${selectedUser._id}`);
                dispatch(setMessages(res.data));
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        if (selectedUser) {
            fetchMessages();
        }
    }, [selectedUser, dispatch]);
};

export default useGetMessages;