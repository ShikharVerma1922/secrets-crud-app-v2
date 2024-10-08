import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import LikeDislikeButton from "./LikeDislikeButton";
import CommentsButton from "./Comments";
import BookmarkButton from "./BookmarkButton";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils.jsx";

const UserBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [likesCount, setLikesCount] = useState({});
  const [commentsCount, setCommentsCount] = useState({});
  const [bookmarksCount, setBookmarksCount] = useState({});
  const userId = JSON.parse(localStorage.getItem("loggedInUser")).id;
  const jwtToken = localStorage.getItem("token");

  const handleLikesUpdate = (postId, likes) => {
    setLikesCount((prev) => ({ ...prev, [postId]: likes }));
  };
  const handleCommentsUpdate = (postId, comments) => {
    setCommentsCount((prev) => ({ ...prev, [postId]: comments }));
  };
  const handleBookmarksUpdate = (postId, bookmarks) => {
    setBookmarksCount((prev) => ({ ...prev, [postId]: bookmarks }));
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const url = `${
          import.meta.env.VITE_API_BASE_URL
        }/bookmark/get-bookmarks/${userId}`;
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
        }
        console.log(data);
        setBookmarks(data);
      } catch (err) {
        handleError("Error fetching bookmarks");
      }
    };

    fetchBookmarks();
  }, [userId]);

  return (
    <div>
      <Container className="post-tile-width">
        <Row>
          <h3>Your Bookmarked Posts</h3>
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark) => (
              <Col key={bookmark.id} md={12} className="mb-4">
                <Card>
                  {/* Styled Header */}
                  <Card.Header
                    className="text-muted d-flex justify-content-between"
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <span>@{bookmark.anonymous_name}</span>
                    <span>
                      {new Date(bookmark.created_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </Card.Header>

                  {/* Post Content */}
                  <Card.Body>
                    <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                      {bookmark.content}
                    </Card.Text>

                    {/* Likes, Comments, and Bookmarks Section */}
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">
                        🗣️ {likesCount[bookmark.id] || 0} whispers
                      </span>
                      <div className="d-flex gap-1">
                        <span className="text-muted">
                          {commentsCount[bookmark.id] || 0} comments
                        </span>
                        <span>·</span>
                        <span className="text-muted">
                          {bookmarksCount[bookmark.id] || 0} saved
                        </span>
                      </div>
                    </div>
                    <Card.Footer
                      className="text-muted d-flex justify-content-around pb-0 px-0"
                      style={{
                        backgroundColor: "transparent",
                      }}
                    >
                      <LikeDislikeButton
                        postId={bookmark.id}
                        onLikesUpdated={(likes) =>
                          handleLikesUpdate(bookmark.id, likes)
                        }
                      />

                      <CommentsButton
                        post={bookmark}
                        onCommentsUpdated={(comments) =>
                          handleCommentsUpdate(bookmark.id, comments)
                        }
                      />
                      <BookmarkButton
                        postId={bookmark.id}
                        onBookmarksUpdated={(bookmarks) =>
                          handleBookmarksUpdate(bookmark.id, bookmarks)
                        }
                      />
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No bookmarks yet.</p>
          )}
        </Row>
      </Container>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default UserBookmarks;
