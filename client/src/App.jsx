import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Authentication/Login.jsx";
import Signup from "./pages/Authentication/Signup.jsx";
import RefreshHandler from "./components/RefreshHandler.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import AboutDeveloper from "./pages/AboutDeveloper/AboutDeveloper.jsx";
import AccountPage from "./pages/Account/Account.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivatedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <div>
      {/* <ToastContainer /> */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        >
          <Route index element={<PrivatedRoute element={<Home />} />} />
          {/* <Route path="/" element={<Navigate to="/login" />}></Route> */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/dashboard"
            element={<PrivatedRoute element={<Dashboard />} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/developer" element={<AboutDeveloper />} />
          <Route
            path="/account"
            element={
              <PrivatedRoute
                element={
                  <AccountPage setIsAuthenticated={setIsAuthenticated} />
                }
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
