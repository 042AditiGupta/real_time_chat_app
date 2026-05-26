import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  const { authUser } = useSelector(
    (store) => store.user
  );

  useEffect(() => {
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

    if (authUser?._id) {
      fetchOtherUsers();
    }
  }, [authUser?._id, dispatch]);
};

export default useGetOtherUsers;