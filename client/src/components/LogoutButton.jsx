import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { FaPowerOff } from "react-icons/fa";
// import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils.jsx";

function LogoutButton({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    handleSuccess("Logout successful");
    setTimeout(() => {
      navigate("/login");
      setIsAuthenticated(false);
    }, 1000);
  };

  return (
    <div>
      <button onClick={handleLogout} className="logout-btn">
        <FaPowerOff className="me-1" /> Logout
      </button>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default LogoutButton;
