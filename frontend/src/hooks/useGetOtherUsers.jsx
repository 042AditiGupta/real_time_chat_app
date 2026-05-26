import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  const { authUser } = useSelector(
    (store) => store.user
  );

  useEffect(() => {
    if (!authUser?._id) return;

    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(
          "/api/v1/user"
        );

        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(
          "Fetch users error:",
          error
        );
      }
    };

    fetchOtherUsers();
  }, [authUser?._id, dispatch]);
};

export default useGetOtherUsers;