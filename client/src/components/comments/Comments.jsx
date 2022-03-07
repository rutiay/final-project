import axios from "axios";
import Modal from "react-bootstrap/Modal";
import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comment from "../comment/Comment";
import Spinner from "../spinner/Spinner";
import Button from "react-bootstrap/Button";
import "./comments.css";

const Comments = ({
  currentUser,
  user,
  post,
  show,
  setShow,
  comments,
  setComments,
}) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      const comments = await axios.get(`/comments/comment/${post?._id}`);
      setComments(comments.data);
      setIsLoading(false);
    };

    fetchComments();
  }, [post.userId, post._id, setComments]);

  const addComment = async (id) => {
    const temp = [...comments];
    const res = await axios.get(`/comments/userComment/${id}`);
    temp.push(res.data);
    setComments(temp);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newComment = {
      postId: post._id,
      senderId: currentUser._id,
      comment,
    };
    if (comment) {
      try {
        const res = await axios.post("/comments/comment", newComment);
        addComment(res.data.insertedId);
      } catch (err) {}
    } else {
      console.log("cant send an empty comment");
    }
  };

  return (
    <>
      <Modal show={show} fullscreen={"md-down"} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Link className="resultListLink" to={`/profile/${user?._id}`}>
              <div>
                <img
                  src={
                    user?.profilePicture
                      ? user?.profilePicture
                      : "https://res.cloudinary.com/doolsewfd/image/upload/v1646679227/user_hz8izs.png"
                  }
                  alt="profileUserImg"
                  className="resultListProfileImg"
                />
                <span>
                  {user?.name} {user?.lastName}
                </span>
              </div>
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="postContainerModal">
            <span>{post?.description}</span>
            {post.img ? (
              <img
                className="postImgModal"
                src={post?.img}
                alt="postImg"
              />
            ) : null}
          </div>
          <hr />
          <div className="newCommentContainer">
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <input
                onChange={(e) => setComment(e.target.value)}
                className="newCommentInput"
                type="text"
                placeholder="Write a new comment"
              />
              <Button type="submit">Add Comment</Button>
            </form>
          </div>
          <hr />
          <>
            {!isLoading ? (
              <div className="commentsContainerModal">
                {comments.length
                  ? comments.map((comment) => {
                      return <Comment key={comment._id} comment={comment} />;
                    })
                  : null}
              </div>
            ) : (
              <Spinner />
            )}
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Comments;
