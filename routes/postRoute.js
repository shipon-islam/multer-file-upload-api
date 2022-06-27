const express = require("express");
const uploads = require("../utilities/fileUpload");

const {
  postStatus,
  getStatus,
  likeStatus,
  allstatus,
  deletePost,
  commentApi,
  replayApi,
} = require("../controllers/postController");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();

router.post("/status", checkLogin, uploads("post_image").any(), postStatus);
router.post("/comment/:id", checkLogin, commentApi);
router.post("/replay/:id", checkLogin, replayApi);
router.put("/likes/:id", checkLogin, likeStatus);
router.delete("/delete/:id", checkLogin, deletePost);
router.get("/getstatus", checkLogin, getStatus);
router.get("/allstatus", allstatus);
module.exports = router;
