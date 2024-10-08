import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const AddPost = ({ closeModal, setShowSuccess }) => {
  const [content, setContent] = useState("");
  const [showError, setShowError] = useState(false);
  const userId = JSON.parse(localStorage.getItem("loggedInUser")).id;
  const jwtToken = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      console.log(content);
      try {
        const url = `${
          import.meta.env.VITE_API_BASE_URL
        }/secret/post/${userId}`;
        const headers = {
          method: "POST",
          headers: {
            Authorization: jwtToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: content.trim() }),
        };
        const response = await fetch(url, headers);
        const data = await response.json();

        if (!response.ok) {
          handleError(data.message);
          setShowError(true);
        } else {
          console.log(data);
          setShowSuccess(data.message);
          handleSuccess("Posted successfully");
        }
      } catch (err) {
        handleError(err);
      }
      !showError && closeModal();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div className="form-group">
          <textarea
            type="textarea"
            value={content}
            className="form-control"
            rows="10"
            placeholder="Write your secret..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
            style={{
              outline: "none",
              boxShadow: "none",
              border: "0",
              resize: "none",
            }}
            maxLength={600}
            required
            autoFocus
          ></textarea>
        </div>
        <div className="d-flex justify-content-between border-top">
          <small className="text-muted">
            {600 - content.length} characters remaining
          </small>
          <button
            className={`btn ${
              content.trim() ? "btn-primary" : "btn-secondary"
            } mt-3 rounded-pill fw-bold`}
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AddPost;
