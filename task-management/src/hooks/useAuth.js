import { message } from "antd";
import { loginUser } from "../backend/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { places } from "../constants/constants";

const { HOME, LOGIN } = places;
// to access logged in user data from multiple components
// login and logout methods to update local storage

const useAuth = () => {
// get logged in user data if its stored
  const [user, setUser] = useLocalStorage("user");
  const navigate = useNavigate();
  const { state } = useLocation();
// login method
// parameter : {username, password}
  const login = async (data) => {
    const response = await loginUser(data);
    const userdata = response.data.data;
    message[response.type](response.data.message, 0.5);
    // after successful login redirect user to home page or state path
    if (userdata) {
      setUser(userdata); // set logged in user data to local storage
      setTimeout(() => {
        navigate(state?.path || HOME);
      }, 500);
    }
    return response;
  };
// remove user data from localstorage on logout
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
