import React from "react";
import { REACT_APP_PUBLIC_FOLDER } from "../../logic/keys";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import "./friends.css";

const Friends = ({ result ,show, setShow }) => {
  const usersList = result.map((user) => {
    return (
      <li className="friendsListItem" key={user?._id}>
        <Link className="friendsListLink" to={`/profile/${user?._id}`}>
          <div>
            <img
              src={
                user?.profilePicture
                  ? REACT_APP_PUBLIC_FOLDER + user?.profilePicture
                  : REACT_APP_PUBLIC_FOLDER + "user.png"
              }
              alt="profileUserImg"
              className="friendsListProfileImg"
            />
            <span>
              {user?.name} {user?.lastName}
            </span>
          </div>
        </Link>
        <hr />
      </li>
    );
  });

  return (
    <>
      <Modal show={show} fullscreen={"lg-down"} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Friends List</Modal.Title>
        </Modal.Header>
        <Modal.Body>{result.length ? usersList : "No Friends"}</Modal.Body>
      </Modal>
    </>
  );
};

export default Friends;
