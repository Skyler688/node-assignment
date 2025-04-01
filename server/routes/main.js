const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Home Page
// router.get("/", async (req, res) => {
//   const locals = {
//     title: "NodeJS Blog",
//     description:
//       "A Blog template application that will be used for your own use.",
//   };

//   try {
//     const data = await Post.find().sort({ title: "desc" });
//     res.render("index", { locals, data });
//   } catch (error) {
//     console.log(error);
//   }
// });

// pagination
router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    let perPage = 3;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { title: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    // Count is deprecated - please use countDocuments({}) instead
    // const count = await Post.count();
    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const hasNextPagePlus = nextPage <= Math.ceil(count * perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage: hasNextPagePlus ? page - 1 : null,
    });
  } catch (error) {
    console.log(error);
  }
});

// About
router.get("/about", async (req, res) => {
  try {
    res.render("about");
  } catch (error) {
    console.log(error);
  }
}) 

// Post route
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description:
        "A Blog template application that will be used for your own use.",
    };
    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

// Search Route
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "A Blog template made with nodeJS and ExpressJS",
    };

    let searchTerm = req.body.SearchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

// dummy data
router.get("/dummy-data", (req, res) => {
  try {
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
    ])
    res.status(200).send("dummy data created");
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
