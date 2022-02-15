import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import Spinner from "../spinner/Spinner";
import "./feed.css";

const Feed = ({ user, home, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      if (home) {
        if (currentUser?._id) {
          const res = await axios.get(`/posts/timeline/${currentUser?._id}`);
          setPosts(
            res.data.sort((firstPost, secondPost) => {
              return (
                new Date(secondPost.createDate) - new Date(firstPost.createDate)
              );
            })
          );
        }
      } else if (user) {
        const res = await axios.get(`/posts/profile/${user?._id}`);
        setPosts(
          res.data.sort((firstPost, secondPost) => {
            return (
              new Date(secondPost.createDate) - new Date(firstPost.createDate)
            );
          })
        );
      }
      // ? if(currentUser) await axios.get(`/posts/timeline/${currentUser?._id}`)
      // : await axios.get(`/posts/profile/${user?._id}`);
      // setPosts(
      //   res.data.sort((firstPost, secondPost) => {
      //     return (
      //       new Date(secondPost.createDate) - new Date(firstPost.createDate)
      //     );
      //   })
      // );
      setIsLoading(false);
    };
    fetchPosts();
  }, [user, home, currentUser._id]);

  return (
    <>
      {!isLoading ? (
        <div className="feed">
          <div className="feedWrapper">
            {user ? (
              user?._id === currentUser?._id ? (
                <Share currentUser={user} posts={posts} setPosts={setPosts} />
              ) : null
            ) : (
              <Share
                currentUser={currentUser}
                posts={posts}
                setPosts={setPosts}
              />
            )}
            {posts.length
              ? posts.map((post) => (
                  <Post currentUser={currentUser} key={post._id} post={post} />
                ))
              : "You haven't shared a single post"}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Feed;

// useEffect(() => {
//   const fetchPosts = async () => {
//     if (home) {
//       const res = await axios.get(`/posts/timeline/${user?._id}`);
//       setPosts(res.data);
//     } else {
//       const res = await axios.get(`/profile/${currentUser?._id}`);
//       setPosts(res.data);
//     }
//   };
//   fetchPosts();
// }, []);
