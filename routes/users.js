const express = require("express");

const router = express.Router();

const {
  findUser,
  getUserById,
  getAllUsers,
  editUser,
  getFriends,
} = require("../controllers/users.js");

const { register, addDetails } = require("../controllers/newUser.js");

/* GET users listing. */
router.get("/", (req, res) => {
  getAllUsers(req, res);
});

router.get("/newuser/:email", (req, res) => {
  findUser(req, res);
});

router.get("/:id", (req, res) => {
  getUserById(req, res);
});

router.patch("/:id/edit", (req, res) => {
  editUser(req, res);
});

router.get("/friends/:id", (req, res) => {
  getFriends(req, res);
});

router.post("/register", (req, res) => {
  register(req, res);
});

router.patch("/details", (req, res) => {
  addDetails(req, res);
});

module.exports = router;
