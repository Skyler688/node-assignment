const Post = require("../models/post");

function insertPostData() {
  Post.insertMany([
    {
      title: "Post One",
      body: "This is the first post",
    },
    {
      title: "Post Two",
      body: "This is another post",
    },
    {
      title: "Post Three",
      body: "This is another post",
    },
    {
      title: "Post Four",
      body: "This is another post",
    },
    {
      title: "Post Five",
      body: "This is another post",
    },
  ]);
}

insertPostData();
