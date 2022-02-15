import axios from "axios";
import React, { useState, useEffect } from "react";
import Feed from "../../components/feed/Feed";
import Navbar from "../../components/navbar/Navbar";
import Spinner from "../../components/spinner/Spinner";
import "./homePage.css";

const Home = ({ auth, currentUser, setCurrentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
      async function fetchUser() {
        const res = await axios.get(`/users/newuser/${auth?.email}`);
        setCurrentUser(res.data);
        setIsLoading(false);
      }
      fetchUser();
  }, [setCurrentUser, auth.email]);

  return (
    <>
      {!isLoading ? (
        <>
          <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
          <div className="homeContainer">
            <Feed currentUser={currentUser} home={true} />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Home;
