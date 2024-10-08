import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import UserPosts from "../../components/UserPost";
import Footer from "../../components/Footer";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils.jsx";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        backgroundColor: "#f8f9fa",
        padding: "20px 0px 0px 0px",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      {isLoading ? (
        <div className="loader">Loading...</div> // You can customize this loading spinner
      ) : (
        <div id="root">
          <main>
            <div>
              <UserPosts newPost={false} allPost={true} />
            </div>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      )}
    </div>
  );
};

export default Home;
