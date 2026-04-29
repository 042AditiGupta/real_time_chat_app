import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import { BASE_URL } from "..";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!authUser?._id) return;

    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/user`, {
          withCredentials: true,
        });

        console.log("other users -> ", res.data);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log("useGetOtherUsers error:", error);
        console.log("backend message:", error.response?.data?.message);
      }
    };

    fetchOtherUsers();
  }, [authUser, dispatch]);
};

export default useGetOtherUsers;