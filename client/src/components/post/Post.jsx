import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdMoreVert } from "react-icons/md";
import { format } from "timeago.js";
import Spinner from "../spinner/Spinner";
import Comments from "../comments/Comments";
import "./post.css";

const Post = ({ post, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const user = await axios.get(`/users/${post?.userId}`);
      const comment = await axios.get(`/comments/comment/${post?._id}`);
      setUser(user.data);
      setComments(comment.data);
      setIsLoading(false);
    };

    fetchUser();
  }, [post.userId, post._id]);

  const countLikesHandler = () => {
    try {
      axios.patch(`/posts/${post._id}/like`, { _id: currentUser._id });
    } catch (err) {}
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <>
      <Comments
        currentUser={currentUser}
        user={user}
        post={post}
        show={show}
        setShow={setShow}
        comments={comments}
        setComments={setComments}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${user._id}`} className="postProfileLink">
                  <img
                    className="postProfileImg"
                    src={
                      user?.profilePicture
                        ? user?.profilePicture
                        : "https://res.cloudinary.com/doolsewfd/image/upload/v1646679227/user_hz8izs.png"
                    }
                    alt="postProfileImg"
                  />
                  <span className="postUserName">
                    {user?.name} {user?.lastName}
                  </span>
                </Link>
                <span className="postDate">{format(post.createDate)}</span>
              </div>
              <div className="postTopRight">
                <MdMoreVert />
              </div>
            </div>
            <div className="postCenter">
              <span className="postText">{post?.description}</span>
              {post?.img ? (
                <img className="postImg" src={post?.img} alt="profileImg" />
              ) : null}
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img
                  onClick={countLikesHandler}
                  className="likeIcons"
                  src="https://res.cloudinary.com/doolsewfd/image/upload/v1646679227/like_kqglac.png"
                  alt="like"
                />
                <img
                  onClick={countLikesHandler}
                  className="likeIcons"
                  src="https://res.cloudinary.com/doolsewfd/image/upload/v1646679227/heart_xmlp36.png"
                  alt="heart"
                />
                <span className="postLikeCounter">{likes} people like it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText" onClick={() => setShow(true)}>
                  {comments.length} comments
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
