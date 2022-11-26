import { message } from "antd";
import { loginUser } from "../backend/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { places } from "../constants/constants";

const { HOME, LOGIN } = places;

const useAuth = () => {
  const [user, setUser] = useLocalStorage("user");
  const navigate = useNavigate();
  const { state } = useLocation();

  const login = async (data) => {
    const response = await loginUser(data);
    const userdata = response.data.data;
    message[response.type](response.data.message, 5);
    if (userdata) {
      setUser(userdata);
      navigate(state?.path || HOME);
    }
    return response;
  };

  const logout = () => {
    setUser(null);
    navigate(LOGIN, { replace: true });
  };

  return {
    isLoggedIn: !!user,
    user,
    login,
    logout,
  };
};
export default useAuth;
