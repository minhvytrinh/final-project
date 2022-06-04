"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// const { v4: uuidv4 } = require("uuid");

// GET all users
const getUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("clicks");
    const result = await db.collection("users").find().toArray();
    client.close();

    result
    ? res.status(200).json({ status: 200, response: result })
    : res.status(404).json({ status: 404, message: "Not Found" });
};

// GET one user by ID
const getUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect();

    const db = client.db("clicks");
    const result = await db.collection("users").findOne({ id: req.query.id });
    
    result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "Not Found" });

    client.close();
};


//------------------------------------------------
const uploadPicture = async (req, res) => {
    console.log(req)
    try {
        const fileStr = req.body.data;
        console.log("hello?", fileStr)
    } catch (error) {
        console.error(error)
    }
}


module.exports = {
    getUser,
    getUsers,
    uploadPicture
};