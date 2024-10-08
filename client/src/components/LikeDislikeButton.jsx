import React, { useState, useEffect } from "react";
import { AiFillDislike, AiOutlineDislike } from "react-icons/ai";
import { RiSpeakFill, RiSpeakLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils.jsx";

const LikeDislikeButton = ({ postId, onLikesUpdated }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null);
  const userId = JSON.parse(localStorage.getItem("loggedInUser")).id;
  const jwtToken = localStorage.getItem("token");

  // Fetch likes/dislikes data for the post
  const fetchLikesDislikes = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/reaction/get-count/${postId}`;
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
        setLikes(data.totalLikes);
        onLikesUpdated(data.totalLikes);
        setDislikes(data.totalDislikes);
      }
    } catch (err) {
      handleError("Error fetching bookmarks");
    }
  };

  // Fetch user's reaction on mount
  const fetchUserReaction = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/reaction/get/${postId}/${userId}`;
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
        setUserReaction(
          data.reaction === true
            ? "like"
            : data.reaction === false
            ? "dislike"
            : null
        );
      }
    } catch (err) {
      handleError(err);
    }
  };

  // Handle like or dislike click
  const handleReaction = async (reaction) => {
    const likeDislike = reaction === "like"; // true for like, false for dislike

    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/reaction/post/${postId}`;
      const headers = {
        method: "POST",
        headers: {
          Authorization: jwtToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, likeDislike }),
      };
      const response = await fetch(url, headers);
      const data = await response.json();

      if (!response.ok) {
        handleError(data.message);
        setShowError(true);
      } else {
        console.log(data);
        setUserReaction(reaction);

        fetchLikesDislikes();
      }
    } catch (err) {
      handleError("Error");
    }
  };

  useEffect(() => {
    fetchLikesDislikes();
    fetchUserReaction();
  }, [postId]);

  return (
    <div
      className="rounded-pill p-1 d-flex"
      style={{ width: "fit-content", backgroundColor: "transparent" }}
    >
      <button
        onClick={() => handleReaction("like")}
        style={{
          color: userReaction === "like" ? "black" : "gray",
          border: "none",
          backgroundColor: "transparent",
        }}
      >
        <div className="d-flex gap-1 align-items-center fw-bold border-end pe-1 like_dislike">
          <span style={{ fontSize: "20px" }}>
            {userReaction === "like" ? <RiSpeakFill /> : <RiSpeakLine />}
          </span>

          <span>Whisper</span>
        </div>
      </button>
      <button
        onClick={() => handleReaction("dislike")}
        style={{
          color: userReaction === "dislike" ? "black" : "gray",
          border: "none",
          backgroundColor: "transparent",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        <div className="like_dislike">
          {userReaction === "dislike" ? (
            <AiFillDislike />
          ) : (
            <AiOutlineDislike />
          )}
        </div>
      </button>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default LikeDislikeButton;
