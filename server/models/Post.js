const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = {
  title: String,
  post: String,
  postedAt: { type: Date, default: Date.now },
  public: Boolean,
};

module.exports = mongoose.model("Post", Post);
