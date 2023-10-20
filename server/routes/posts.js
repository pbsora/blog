const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const jwt = require("jsonwebtoken");

router.get("/post", async (req, res) => {
  try {
    const posts = await Post.find({ public: true });

    res.send(posts);
  } catch (error) {
    console.log(error);
  }
});

router.post("/post", verifyToken, async (req, res) => {
  try {
    jwt.verify(req.token, "puguinho", async (err, authData) => {
      if (err) return res.status(403).json({ message: "Token not valid" });
      const { title, post, public } = req.body;
      const newPost = new Post({
        title,
        post,
        public,
      });
      await newPost.save();
      res.status(201).json({ authData, message: "Post created sucessfully" });
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/post/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await Post.findOne(
      { slug },
      { title: 1, post: 1, postedAt: 1 }
    ).exec();
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
  }
});

router.get("/post/:id/comment", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id })
      .sort({ createdAt: -1 })
      .exec();
    res.send(comments);
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

//Verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined")
    return res.status(403).json({ message: "Token not found" });
  const bearerToken = bearerHeader.split(" ")[1];
  req.token = bearerToken;
  next();
}
module.exports = router;
