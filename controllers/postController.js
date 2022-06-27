const postModal = require("../models/postModel");
const { unlink } = require("fs");
const path = require("path");
const comment = require("../models/commentModel");

//create new post status

const postStatus = async (req, res) => {
  let newPost;
  try {
    if (req.files && req.files.length > 0 && req.body.post) {
      newPost = new postModal({
        avatar: `${req.protocol}://${req.get("host")}/uploads/post_image/${
          req.files[0].filename
        }`,
        post: req.body.post,
        user: req.user.id,
      });
    } else if (!req.body.post && req.files && req.files.length > 0) {
      newPost = new postModal({
        avatar: `${req.protocol}://${req.get("host")}/uploads/post_image/${
          req.files[0].filename
        }`,
        user: req.user.id,
      });
    } else {
      newPost = new postModal({ post: req.body.post, user: req.user.id });
    }

    const resPost = await newPost.save();
    if (!resPost) {
      res.status(400).json({ errors: "not create" });
    } else {
      res.status(201).send(resPost);
    }
  } catch (error) {
    console.log(error);
  }
};

// post like api

const likeStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModal.findById(id);
    const isLike = post.likes.includes(req.user.id);
    if (!isLike) {
      const posts = await postModal.findOneAndUpdate(
        { _id: id },
        {
          $push: { likes: req.user.id },
        }
      );
      res.send(posts);
    } else {
      const posts = await postModal.findOneAndUpdate(
        { _id: id },
        {
          $pull: { likes: req.user.id },
        }
      );
      res.send(posts);
    }
  } catch (error) {
    console.log(error);
  }
};

//get athounticated user post

const getStatus = async (req, res) => {
  try {
    const User = await postModal
      .find({ user: req.user.id })
      .populate([
        {
          path: "comments",
          populate: [
            { path: "user" },
            { path: "replies", populate: [{ path: "user" }] },
          ],
        },
        {
          path: "user",
        },
      ])
      .sort({ createdAt: -1 });

    res.send(User);
  } catch (error) {
    console.log(error);
  }
};
// get all user post status
const allstatus = async (req, res) => {
  try {
    const user = await postModal
      .find()
      .populate([
        {
          path: "comments",
          populate: [
            { path: "user" },
            { path: "replies", populate: [{ path: "user" }] },
          ],
        },
        {
          path: "user",
        },
      ])
      .sort({ createdAt: -1 });

    res.send(user);
  } catch (error) {}
};

//delete post

const deletePost = async (req, res) => {
  const { id } = req.params;
  const resp = await postModal.findByIdAndDelete(id);
  if (resp && resp.avatar) {
    const filenames = resp.avatar;
    unlink(
      path.join(__dirname, `/../public/uploads/avatar/${filenames}`),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
  res.send(resp);
};

//post comment api
const commentApi = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  console.log(req.body);
  try {
    if (req.body.coment) {
      const Comment = new comment({
        post: postId,
        user: userId,
        body: req.body.coment,
      });
      const comments = await Comment.save();
      await postModal.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: comments._id } }
      );
      res.send(comments);
    }
  } catch (error) {
    console.log(error);
  }
};

//user replay api
const replayApi = async (req, res) => {
  const commentId = req.params.id;
  try {
    if (req.body.rebody) {
      const replies = await comment.findOneAndUpdate(
        { _id: commentId },
        { $push: { replies: { body: req.body.rebody, user: req.user.id } } }
      );
      res.send(replies);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postStatus,
  getStatus,
  likeStatus,
  allstatus,
  deletePost,
  commentApi,
  replayApi,
};
