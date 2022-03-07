import axios from "axios";
import React, { useState } from "react";
import { MdPermMedia, MdEmojiEmotions, MdCancel } from "react-icons/md";
import "./share.css";

const Share = ({ currentUser, posts, setPosts }) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const addPost = async (id) => {
    const temp = [...posts];
    const res = await axios.get(`/posts/${id}`);
    temp.unshift(res.data);
    setPosts(temp);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUser._id,
      description,
      likes: [],
    };
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gmrptfso");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/doolsewfd/image/upload",
        formData
      );
      newPost.img = response.data.url;
    }
    if (description || file) {
      try {
        const res = await axios.post("/posts/create", newPost);
        addPost(res.data.insertedId);
      } catch (err) {}
    } else {
      console.log("cant post an empty post");
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              currentUser?.profilePicture
                ? currentUser?.profilePicture
                : "https://res.cloudinary.com/doolsewfd/image/upload/v1646679227/user_hz8izs.png"
            }
            alt="profileImg"
          />
          <input
            placeholder={`What's on your mind, ${
              currentUser?.name?.charAt(0)?.toUpperCase() +
              currentUser?.name?.slice(1)
            }?`}
            className="shareInput"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <MdCancel
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form
          className="shareBottom"
          onSubmit={(e) => {
            submitHandler(e);
            setDescription("");
            setFile(null);
          }}
        >
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <MdPermMedia style={{ color: "tomato" }} className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <MdEmojiEmotions
                style={{ color: "gold" }}
                className="shareIcon"
              />
              <span className="shareOptionText">Emotions</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
