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
   updateUser,
   getPostsByFilmStock,
   getFilmStocks,
   getPostsByUser,
   addComments,
   updateLikes,
   deleteComment,
   updateFollow
} = require("./handlers");

express()
   .use(morgan("tiny"))
   .use(express.json())
   .use(express.static("public"))

// ---------------------------------
   // USERS ENDPOINTS
   .get("/api/users", getUsers)
   .get("/api/profile/:_id", getUser)
   .post("/api/signup", addUser)
   .put("/api/update-user", updateUser)
   .patch("/api/follow", updateFollow)

   // POSTS (PICTURES) ENDPOINTS
   .get("/api/posts", getPosts)
   .get("/api/post/:id", getPost)
   .post("/api/post/upload", uploadPicture)
   .get("/api/posts-by-film", getPostsByFilmStock)
   .get("/api/filmstocks", getFilmStocks)
   .get("/api/posts-by-user", getPostsByUser)

   // LIKES & COMMENTS ENDPOINTS
   .patch("/api/updating-likes", updateLikes)
   .post("/api/new-comment", addComments)
   .delete("/api/delete-comment", deleteComment)

// ---------------------------------
// this is our catch all endpoint.
   .get("*", (req, res) => {
      res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
      });
   })


   .listen(8000, () => console.log(`Listening on port 8000`));
