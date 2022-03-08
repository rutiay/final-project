const express = require("express");

const router = express.Router();

const {
  // addComment,
  // deleteComment,
  addNewCommnet,
  getAllComments,
  getComment,
} = require("../controllers/posts.js");

// router.patch("/:id/comment", (req, res) => {
//   addComment(req, res);
// });

// router.delete("/:id/comment", (req, res) => {
//   deleteComment(req, res);
// });

router.post("/comment", (req, res) => {
  addNewCommnet(req, res);
});

router.get("/comment/:postId", (req, res) => {
  getAllComments(req, res);
});

router.get("/userComment/:commentId", (req, res) => {
  getComment(req, res);
});

module.exports = router;
