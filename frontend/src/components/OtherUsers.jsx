import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setOtherUsers } from '../redux/userSlice';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const { authUser } = useSelector(store => store.user);

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get('/api/v1/user/other-users');
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        if (authUser) {
            fetchOtherUsers();
        }
    }, [authUser, dispatch]);
};

export default useGetOtherUsers;