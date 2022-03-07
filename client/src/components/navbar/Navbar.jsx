// import { BsSearch, BsFillChatDotsFill } from "react-icons/bs";
// import { IoMdNotifications } from "react-icons/io";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Logo from "../logo/Logo";
import Search from "../search/Search";
import Friends from "../friends/Friends";
import axios from "axios";
import "./navbar.css";

const Navbar = ({ currentUser, setCurrentUser }) => {
  const [show, setShow] = useState(false);
  const [logout, setLogout] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (currentUser?._id) {
      async function fetchFriends() {
        const res = await axios.get(`/users/friends/${currentUser?._id}`);
        setResult(res.data);
      }

      fetchFriends();
    }
  }, [currentUser._id]);

  if (logout) {
    return <Redirect to="/" />;
  }

  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <Logo />
      </div>
      <div className="navbarCenter">
        <div className="searchBar">
          <Search />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <Link to="/home">
              <AiFillHome title="Home" />
            </Link>
          </div>
          <div className="navbarIconItem">
            <FaUserFriends
              title="Friends"
              className="friendsIcon"
              onClick={() => setShow(true)}
            />
            <span className="navbarIconBadge"></span>
            <Friends result={result} show={show} setShow={setShow} />
          </div>
          {/* <div className="navbarIconItem">
            <IoMdNotifications />
            <span className="navbarIconBadge">1</span>
          </div> */}
          {/* <div className="navbarIconItem">
            <Link to="/chat">
              <BsFillChatDotsFill title="Chat" />
              <span className="navbarIconBadge"></span>
            </Link>
          </div> */}
        </div>
        <div className="navbarUser">
          <Link to={`/profile/${currentUser?._id}`}>
            <span className="navbarUserName">{currentUser?.name}</span>
            <img
              src={
                currentUser?.profilePicture
                  ? currentUser?.profilePicture
                  : "https://res.cloudinary.com/doolsewfd/image/upload/v1646679227/user_hz8izs.png"
              }
              alt="profileImg"
              className="navbarProfileImg"
            />
          </Link>
          <AiOutlineLogout
            className="navbarUserIcon"
            title="Log Out"
            onClick={() => {
              setLogout(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
