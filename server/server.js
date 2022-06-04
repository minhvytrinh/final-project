"use strict";

const express = require("express");
const morgan = require("morgan");

const {
   uploadPicture,
   getUser,
   getUsers
} = require("./handlers");

express()
   .use(morgan("tiny"))
   .use(express.json())
   .use(express.static("public"))
   // .use(express.json({limit: '50mb'}))
   // .use(express.urlencoded({limit: '50mb', extended: true}))

// ---------------------------------
   .get("/api/users", getUsers)
   .get("/api/profile", getUser)
// .patch("/api/update-profile", updateProfile)
// .delete("/api/delete-profile", deleteProfile)


   .post("/api/upload", uploadPicture)


// ---------------------------------
// this is our catch all endpoint.
   .get("*", (req, res) => {
      res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
      });
   })


   .listen(8000, () => console.log(`Listening on port 8000`));
