import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    // Only fetch if user is logged in
    if (!authUser?._id) {
      console.log("No user logged in, skipping fetch");
      return;
    }

    const fetchOtherUsers = async () => {
      try {
        // ✅ FIXED: Use the correct endpoint (no /other-users)
        const res = await axios.get('/api/v1/user/');
        console.log("other users -> ", res.data);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log("useGetOtherUsers error:", error);
        console.log("backend message:", error.response?.data?.message);
      }
    };

    fetchOtherUsers();
  }, [authUser?._id, dispatch]);
};

export default useGetOtherUsers;