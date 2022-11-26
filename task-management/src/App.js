import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Reports from "./components/Reports";
import './App.css'
import { places } from "./constants/constants";
const { REPORTS, LOGIN, HOME} = places
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={REPORTS} element={<Reports />} />
        <Route path={HOME} element={<Home />} />
        <Route path={LOGIN} element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
