import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { getUserId } from "../redux/actionCreators";

export const useAuth = () => {
  const dispatch = useDispatch();
  return () => {
    const auth = getAuth();
    const user = auth.currentUser ? auth.currentUser.uid : null;
    dispatch(getUserId(user));
  };
};
