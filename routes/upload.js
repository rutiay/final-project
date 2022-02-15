const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
