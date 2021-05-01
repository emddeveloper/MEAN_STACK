const express = require("express");
const Post = require("./models/post");
const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
const bodyParser = require("body-parser");
const user = require("./models/user");
const jwt = require("jsonwebtoken");
const checkAuth = require("./middleware/check-auth");
mongoose
  .connect(
    "mongodb+srv://emduser1:emduser1@cluster0.03yff.mongodb.net/meanstackdb?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("database connected successfully !");
  })
  .catch((erroe) => {
    console.log("something went wrong " + error);
  });
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

app.get("/api/posts", (req, res, next) => {
  Post.find().then((document) => {
    res.status(200).json({
      message: "post fetched successfully",
      posts: document,
    });
  });
});

//post services

app.post("/api/posts", checkAuth, (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save(); // insert data/documents  into database/
  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
    posts: post,
  });
  posts.push(post);
});

// delete post

app.delete("/api/posts/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: req.params.id + " deleted successfully",
      data: result,
    });
  });
});

//signup
app.post("/api/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 5).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          _message: "user created",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
});

//login
app.post("/api/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          _message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          _message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, fetchedUser: user._id },
        "very-long-sentence",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        _message: "login successfull",
        token: token,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        _message: "Auth failed",
      });
    });
});
module.exports = app;
