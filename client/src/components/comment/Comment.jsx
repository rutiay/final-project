import axios from "axios";
import React, { useState, useEffect } from "react";
import { format } from "timeago.js";
import "./comment.css";

const Comment = ({ comment }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const comments = await axios.get(`/users/${comment?.senderId}`);
      setUser(comments.data);
    };

    fetchUser();
  },[comment.senderId]);

  return (
    <div>
      <img
        src={
          user?.profilePicture
            ? user?.profilePicture
            : "https://res.cloudinary.com/doolsewfd/image/upload/v1646679227/user_hz8izs.png"
        }
        alt="ProfileImg"
        className="imgOfUser"
      />
      <span className="userName">
        {user?.name} {user?.lastName}
      </span>
      <p className="postComment">{comment.comment}</p>
      <span className="postCommentDate">{format(comment.createDate)}</span>
    </div>
  );
};

export default Comment;
