import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import EditForm from "../editForm/EditForm";
import "./rightbar.css";

const Rightbar = ({ user, currentUser, setCurrentUser }) => {
  const [show, setShow] = useState(false);
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser?.followings?.includes(user?._id)
  );

  useEffect(() => {
    if (!(Object.keys(user).length === 0 && user.constructor === Object)) {
      const getFriends = async () => {
        try {
          const friendList = await axios.get(`/users/friends/${user._id}`);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }
  }, [user]);

  const followingHandler = async () => {
    try {
      if (followed) {
        await axios.patch(`/follow/${user._id}/unfollow`, {
          _id: currentUser._id,
        });
      } else {
        await axios.patch(`/follow/${user._id}/follow`, {
          _id: currentUser._id,
        });
      }
      setFollowed(!followed);
    } catch (err) {}
  };
  return (
    <>
    <EditForm show={show} setShow={setShow} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user._id !== currentUser._id && (
          <button className="rightbarFollowButton" onClick={followingHandler}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <IoIosRemove /> : <IoIosAdd />}
          </button>
        )}
        <h4 className="rightbarTitle">
          {user.name}'s information
          {user._id === currentUser._id && (
            <>
              <AiOutlineEdit
                title="edit info"
                className="rightbarEditButton"
                onClick={() => setShow(true)}
              />
            </>
          )}
        </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Name:</span>
            <span className="rightbarInfoValue">{user.name}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Last Name:</span>
            <span className="rightbarInfoValue">{user.lastName}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">{user.name}'s friends</h4>
        <div className="rightbarFollowings">
          {friends.length
            ? friends.map((friend) => (
                <Link
                  key={friend._id}
                  to={`/profile/${friend._id}`}
                  className="rightbarFollowingsLink"
                >
                  <div className="rightbarFollowing">
                    <img
                      src={
                        friend.profilePicture
                          ? friend.profilePicture
                          : "https://res.cloudinary.com/doolsewfd/image/upload/v1646679227/user_hz8izs.png"
                      }
                      alt="profileImg"
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">
                      {friend.name} {friend.lastName}
                    </span>
                  </div>
                </Link>
              ))
            : "You don't follow anyone"}
        </div>
      </div>
    </div>
    </>
  );
};

export default Rightbar;
