import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Reports from "./components/Reports";
import "./App.css";
import { places } from "./constants/constants";
import useAuth from "./hooks/useAuth";
const { REPORTS, LOGIN, HOME } = places;

// protected layer for routes, based on loggedin session
const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to={LOGIN} replace state={{ path: location.pathname }} />
  );
};
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path={REPORTS}
            element={
              <RequireAuth>
                <Reports />
              </RequireAuth>
            }
          />
          <Route
            path={HOME}
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path={LOGIN} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
