"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

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

// GET one user by _id
const getUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect();

    const db = client.db("clicks");
    const result = await db.collection("users").findOne({ id: req.params._id });
    
    result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "Not Found" });

    client.close();
};

// POST new user
const addUser = async (req, res) => {
    const user = req.body;
    const client = new MongoClient(MONGO_URI, options);

    //Connect client
    await client.connect();
    console.log('connected!');
    const db = client.db('clicks');
    //Connect client

    const checkId = { _id: user.user.sub };
    const update = {
        $set: {
            _id: user.user.sub,
            given_name: user.user.given_name,
            family_name: user.user.family_name,
            nickname: user.user.nickname,
            name: user.user.name,
            picture: user.user.picture,
            locale: user.user.locale,
            updated_at: user.user.updated_at,
            email: user.user.email,
            email_verified: user.user.email_verified,
        },
    };
    const upsert = { upsert : true }
    const result = await db
        .collection('users')
        .updateOne(checkId, update, upsert);
    
    //Close client
    client.close();
    console.log('disconnected!');
    //Close client
    
    result.modifiedCount === 0
        ? res.status(201).json({
            status: 201,
            data: user.user.sub,
            message: 'User added to MongoDb!',
        })
        : res.status(404).json({
            status: 404,
            data: user.user.sub,
            message: 'User was added already!'
        });
};

// UPDATE user
const updateUser = async (req, res) => {
    const _id = req.params._id

    // const { name, username, bio, email, pronouns  } = req.body;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("clicks");
    const newValues = {
        $set: {
            "name": user.name,
            "email": user.email,
            "username": user.username,
            "bio": user.bio,
            "pronouns": user.pronouns
        }
    };
    const user = await db.collection("users").updateOne({ _id}, newValues)
    client.close();


    user.modifiedCount === 1 ?
        res.status(200).json({ status: 200, message: "User was updated!" }) :
        res.status(404).json({ status: 404, message: "Not Found!" });
};

//------------------------------------------------
const getPosts = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("clicks");
    const result = await db.collection("posts").find().toArray();
    client.close();

    result
    ? res.status(200).json({ status: 200, response: result })
    : res.status(404).json({ status: 404, message: "Not Found" });
};

// GET one post by _id
const getPost = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect();

    const db = client.db("clicks");
    const result = await db.collection("posts").findOne({ id: req.params.id });
    
    result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, message: "Not Found" });

    client.close();
};

// ADD post
const uploadPicture = async (req, res) => {
    const { url, sub, caption, filmStock } = req.body;
    const newPicture = { ...req.body, id: uuidv4()  };

    const client = new MongoClient(MONGO_URI, options);

    //Connect client
    await client.connect();
    console.log('connected!');
    const db = client.db('clicks');
    //Connect client
    const update = await db.collection("posts").insertOne(newPicture);
    console.log("update", update)
    client.close();

    if (update.insertedId) {
        res.status(200).json({ status: 200, data: newPicture });
    } else {
    res.status(404).json({ status: 404, message: "Error" });
    }
}




module.exports = {
    getUser,
    getUsers,
    getPosts,
    getPost,
    uploadPicture,
    addUser,
    updateUser
};