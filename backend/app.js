const express = require("express");
const Post = require("./models/post");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
mongoose.connect(
  "mongodb+srv://emduser1:emduser1@cluster0.03yff.mongodb.net/meanstackdb?retryWrites=true&w=majority"
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
//get the all posts
let posts = [
  {
    id: 121212,
    title: "First backend post",
    content: "First backend post ontent shgdsd ujsd tysdhjsd hyshdjsd jusd",
  },
  {
    id: 545554,
    title: "Second backend post",
    content: "Second backend post ontent shgdsd ujsd tysdhjsd hyshdjsd jusd",
  },
];
app.get("/api/posts", (req, res, next) => {
  res.status(200).json({
    message: "post fetched successfully",
    posts: posts,
  });
});

//post services

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
    posts: post,
  });
  posts.push(post);
});
module.exports = app;
