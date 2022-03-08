const express = require("express");

const router = express.Router();

const {
  getPost,
  addPost,
  editPost,
  deletePost,
  likePost,
  getPosts,
  getUserPosts,
} = require("../controllers/posts.js");

router.get("/:id", (req, res) => {
  getPost(req, res);
});

router.get("/profile/:id", (req, res) => {
  getUserPosts(req, res);
});

router.post("/create", (req, res) => {
  addPost(req, res);
});

router.get("/timeline/:id", (req, res) => {
  getPosts(req, res);
});

router.patch("/:id", (req, res) => {
  editPost(req, res);
});

router.delete("/:id", (req, res) => {
  deletePost(req, res);
});

router.patch("/:id/like", (req, res) => {
  likePost(req, res);
});

module.exports = router;
