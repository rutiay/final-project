const express = require("express");

const router = express.Router();

const { addToFollowings, removeFromFollowings } = require("../controllers/follow.js");

router.patch("/:id/follow", (req, res) => {
  addToFollowings(req, res);
});

router.patch("/:id/unfollow", (req, res) => {
  removeFromFollowings(req, res);
});

module.exports = router;
