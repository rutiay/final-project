import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./searchResult.css";

const SearchResult = ({ result, show, setShow }) => {
  const usersList = result.map((user) => {
    return (
      <li className="resultListItem" key={user?._id}>
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
        <hr />
      </li>
    );
  });

  return (
    <>
      <Modal show={show} fullscreen={"lg-down"} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>{result.length ? usersList : "No result"}</Modal.Body>
      </Modal>
    </>
  );
};

export default SearchResult;
