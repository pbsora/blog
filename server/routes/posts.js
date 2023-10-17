const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

router.get("/post", async (req, res) => {
  try {
    const posts = await Post.find({ public: true });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
});

router.post("/post", async (req, res) => {
  try {
    const { title, post, public } = req.body;
    const newPost = new Post({
      title,
      post,
      public,
    });
    await newPost.save();
    res.status(201).json({ message: "Post created sucessfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/post/:id/comment", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.json(comments);
  } catch (error) {
    console.log(error);
  }
});

router.post("/post/:id/comment", async (req, res) => {
  try {
    const postId = req.params.id;
    const { content, author } = req.body;

    const comment = new Comment({
      content,
      author,
      postId,
    });
    await comment.save();
    res.status(201).json({ message: "Commented sucessfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
