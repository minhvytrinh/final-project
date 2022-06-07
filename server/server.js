"use strict";

const express = require("express");
const morgan = require("morgan");

const {
   uploadPicture,
   getUser,
   getUsers,
   getPosts,
   getPost,
   addUser,
   updateUser
} = require("./handlers");

express()
   .use(morgan("tiny"))
   .use(express.json())
   .use(express.static("public"))

// ---------------------------------
   .get("/api/users", getUsers)
   .get("/api/profile/:_id", getUser)
   .post("/api/signup", addUser)
   .patch("/api/update-user", updateUser)
// .delete("/api/delete-profile", deleteProfile)

   .get("/api/posts", getPosts)
   .get("/api/post/:id", getPost)
   .post("/api/post/upload", uploadPicture)


// ---------------------------------
// this is our catch all endpoint.
   .get("*", (req, res) => {
      res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
      });
   })


   .listen(8000, () => console.log(`Listening on port 8000`));
