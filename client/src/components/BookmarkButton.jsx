import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils.jsx";

const BookmarkButton = ({ postId, onBookmarksUpdated }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const userId = JSON.parse(localStorage.getItem("loggedInUser")).id;
  const jwtToken = localStorage.getItem("token");

  const checkIfBookmarked = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/bookmark/get/${postId}/${userId}`;
      const headers = {
        method: "GET",
        headers: {
          Authorization: jwtToken,
        },
      };
      const response = await fetch(url, headers);
      const data = await response.json();

      if (!response.ok) {
        handleError(data.message);
      } else {
        console.log(postId, data.isBookmarked);
        setIsBookmarked(data.isBookmarked);
        handleSuccess(data.message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const fetchBookmarkCount = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/bookmark/get-count/${postId}`;
      const headers = {
        method: "GET",
        headers: {
          Authorization: jwtToken,
        },
      };
      const response = await fetch(url, headers);
      const data = await response.json();

      if (!response.ok) {
        handleError(data.message);
      } else {
        console.log(data);
        onBookmarksUpdated(data.totalBookmarks);
      }
    } catch (err) {
      handleError("Error fetching total bookmark");
    }
  };

  const handleBookmark = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/bookmark/post/${postId}`;
      const headers = {
        method: "POST",
        headers: {
          Authorization: jwtToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      };
      const response = await fetch(url, headers);
      const data = await response.json();

      if (!response.ok) {
        handleError(data.message);
      } else {
        console.log(data);
        setIsBookmarked(true);
        handleSuccess(data.message);
        fetchBookmarkCount();
      }
    } catch (err) {
      handleError("Error adding bookmark");
    }
  };

  const handleRemoveBookmark = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/bookmark/delete/${postId}/${userId}`;
      const headers = {
        method: "DELETE",
        headers: {
          Authorization: jwtToken,
        },
      };
      const response = await fetch(url, headers);
      const data = await response.json();

      if (!response.ok) {
        handleError(data.message);
      } else {
        console.log(data);
        setIsBookmarked(false);
        handleSuccess(data.message);
        fetchBookmarkCount();
      }
    } catch (err) {
      handleError("Error adding bookmark");
    }
  };

  useEffect(() => {
    checkIfBookmarked();
    fetchBookmarkCount();
  }, [postId]);

  return (
    <div>
      <button
        onClick={isBookmarked ? handleRemoveBookmark : handleBookmark}
        className="border-0 rounded-pill like_dislike"
        style={{ backgroundColor: "transparent" }}
      >
        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </button>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default BookmarkButton;
