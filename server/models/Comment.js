const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
  author: String,
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comment", Comment);
