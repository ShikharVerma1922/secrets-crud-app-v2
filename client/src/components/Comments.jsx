import React, { useState, useEffect } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { Modal, Button, Form } from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils.jsx";

// CommentsButton Component
const CommentsButton = ({ post, onCommentsUpdated }) => {
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const userId = JSON.parse(localStorage.getItem("loggedInUser")).id;
  const jwtToken = localStorage.getItem("token");

  const handleShow = () => {
    setAnimateModal(true);
    setShowModal(true);
  };
  const handleClose = () => {
    setAnimateModal(false); // Start slide-down animation
    setTimeout(() => setShowModal(false), 500);
    setNewComment("");
  };

  const getShortTimeAgo = (date) => {
    const distance = formatDistanceToNowStrict(new Date(date), {
      addSuffix: true,
    });

    if (distance.includes("minute")) {
      return `${distance.replace(" minutes", "m")}`;
    } else if (distance.includes("hour")) {
      return `${distance.replace(" hours", "h")}`;
    } else if (distance.includes("day")) {
      return `${distance.replace(" days", "d")}`;
    } else if (distance.includes("month")) {
      return `${distance.replace(" months", "mo")}`;
    } else if (distance.includes("year")) {
      return `${distance.replace(" years", "y")}`;
    }
    return distance;
  };

  const fetchComments = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/comment/get/${post.id}`;
      const headers = {
        headers: {
          Authorization: jwtToken,
        },
      };
      const response = await fetch(url, headers);
      const data = await response.json();

      if (!response.ok) {
        handleError(data.message);
      }
      console.log(data);
      setComments(data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    if (showModal) {
      fetchComments();
    }
  }, [showModal, post.id]);

  const fetchCommentCount = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/comment/get-count/${
        post.id
      }`;
      const headers = {
        headers: {
          Authorization: jwtToken,
        },
      };
      const response = await fetch(url, headers);
      const data = await response.json();

      if (!response.ok) {
        handleError(data.message);
      }
      console.log(data);
      onCommentsUpdated(data.totalComments || 0);
    } catch (err) {
      handleError(err);
    }
  };

  // Handle adding a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/comment/post/${
        post.id
      }`;
      const headers = {
        method: "POST",
        headers: {
          Authorization: jwtToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment_text: newComment,
          userId: userId,
        }),
      };
      const response = await fetch(url, headers);
      const addedComment = await response.json();

      if (!response.ok) {
        handleError(addedComment.message);
      }
      setComments((prevComments) => [...prevComments, addedComment]);
      setNewComment("");
      fetchCommentCount();
      fetchComments();
      // handleClose();
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchCommentCount();
  }, [post.id]);

  return (
    <>
      <button
        onClick={handleShow}
        className="rounded-pill border-0 p-2 text-muted"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="like_dislike" style={{ fontWeight: "bold" }}>
          <FaRegCommentDots /> Comment
        </div>
      </button>

      {showModal && (
        <Modal
          show={showModal}
          onHide={handleClose}
          dialogClassName={`bottom-slide-modal ${
            animateModal ? "show" : "hide"
          }`}
          backdropClassName="modal-backdrop"
          aria-labelledby="contained-modal-title-vcenter"
          //   centered
        >
          <Modal.Header closeButton className="p-1">
            <Modal.Title>Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0 px-2">
            {/* Original Post */}
            {/* <div className="mb-4">
              <h5>Original Post</h5>
              <div style={{ whiteSpace: "pre-wrap" }}>{post.content}</div>
            </div> */}

            {/* Comments Section */}
            <div className="comments-section">
              {/* <h5>Comments</h5> */}
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="pb-3 border-bottom">
                    <div className="d-flex justify-content-start gap-1 text-muted">
                      <small>@{comment.name}</small> <br />
                      <small>•</small>
                      <small>{getShortTimeAgo(comment.created_at)}</small>
                    </div>

                    <div
                      style={{ whiteSpace: "pre-wrap", paddingLeft: "15px" }}
                    >
                      {comment.comment_text}
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>

            {/* Add New Comment */}
            <div className="fixed-input-area">
              <Form
                onSubmit={handleAddComment}
                className="d-flex justify-content-between"
                style={{ width: "100%", marginTop: "5px" }}
              >
                <Form.Group style={{ width: "100%" }}>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    maxLength={200}
                    value={newComment}
                    placeholder="Add a comment..."
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      resize: "none",
                      overflow: "hidden",
                    }}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="rounded-pill ms-2"
                  style={{ color: "white" }}
                >
                  <IoIosSend size={20} />
                </Button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {/* <ToastContainer /> */}
    </>
  );
};

export default CommentsButton;
