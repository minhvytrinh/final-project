"use strict";

const express = require("express");
const morgan = require("morgan");

const {
   uploadPost,
   getUser,
   getUsers,
   getPosts,
   getPost,
   addUser
} = require("./handlers");

express()
   .use(morgan("tiny"))
   .use(express.json())
   .use(express.static("public"))

// ---------------------------------
   .get("/api/users", getUsers)
   .get("/api/profile/:id", getUser)
   .post("/api/signup", addUser)
// .patch("/api/update-profile", updateProfile)
// .delete("/api/delete-profile", deleteProfile)

   .get("/api/posts", getPosts)
   .get("/api/post/:postId", getPost)
   .post("/api/post/upload", uploadPost)


// ---------------------------------
// this is our catch all endpoint.
   .get("*", (req, res) => {
      res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
      });
   })


   .listen(8000, () => console.log(`Listening on port 8000`));
