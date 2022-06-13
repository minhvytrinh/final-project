"use strict";
const { MongoClient } = require("mongodb");
const { userInfo } = require("os");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

//============================USERS HANDLERS============================
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
    const result = await db.collection("users").findOne({ _id: req.params._id });
    
    result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "Not Found" });

    client.close();
};

// POST new user
const addUser = async (req, res) => {
    const user = req.body;
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('clicks');

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
    
    client.close();

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

// PUT (update) user
const updateUser = async (req, res) => {
    const user = req.body

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("clicks");
    const newValues = {
        $set: {
            "handleName": user.handleName && user.handleName,
            "username": user.username && user.username,
            "bio": user.bio && user.bio,
            "pronouns": user.pronouns && user.pronouns,
            "url": user.url && user.url
        }
    };

    const checkId = { _id: user.user.sub }

    const update = await db.collection("users").updateOne(checkId, newValues)
    client.close();

    update.modifiedCount === 1 ?
        res.status(200).json({ status: 200, message: "User was updated!" }) :
        res.status(404).json({ status: 404, message: "Not Found!" });
};

// FOLLOW/UNFOLLOW users
const updateFollow = async (req, res) => {
    const { _id, user } = req.body;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db('clicks');

    // with the user _id, check in the followings array to see if that _id is in 
    const searchResult = await db.collection('users').findOne({ _id: user, "followings._id": _id });

    // if can't find match, it means the current user is not following the person, so we can PUSH their _id in the followings array
    if (searchResult === null) {
        const addFollow = await db.collection('users').updateOne(
            { _id: user },
            {
            $push: {
                followings: {
                _id
                },
            },
            }
        );
        // also updating the followers array from the user being followed
        const addFollower = await db.collection('users').updateOne(
            { _id: _id },
            {
            $push: {
                followers: {
                user
                },
            },
            }
        );

        client.close();

        addFollow.modifiedCount === 1 && addFollower.modifiedCount === 1
        ? res.status(200).json({ status: 200, message: 'Successfully followed' })
        : res.status(404).json({ status: 404, message: 'Not Found' });
    } else {
        // if the verification does find a match, it means the user is already following the person, so we need to REMOVE the user from the array (unfollowing)
        const removeFollow = await db.collection('users').updateOne(
            { _id: user },
            {
            $pull: {
                followings: {
                _id
                },
            },
            }
        );
        // also removing the follower from the followers array
        const removeFollower = await db.collection('users').updateOne(
            { _id: _id },
            {
            $pull: {
                followers: {
                user
                },
            },
            }
        );

        client.close();

        removeFollow.modifiedCount === 1 && removeFollower.modifiedCount === 1
        ? res.status(201).json({ status: 201, message: 'Successfully unfollowed' })
        : res.status(404).json({ status: 404, message: 'Not Found' });
    }
};

//============================POSTS HANDLERS============================
// GET all posts
const getPosts = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("clicks");
    const result = await db.collection("posts").find().toArray();
    client.close();

    const shuffleResult = result.sort((a,b) => 0.5 - Math.random());

    shuffleResult
    ? res.status(200).json({ status: 200, response: shuffleResult })
    : res.status(404).json({ status: 404, message: "Not Found" });
};

// GET one post by ID
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

// POST (add) post
const uploadPicture = async (req, res) => {
    const { url, sub, caption, filmStock, nickname } = req.body;
    const newPicture = { ...req.body, id: uuidv4()  };

    const client = new MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db('clicks');

    const update = await db.collection("posts").insertOne(newPicture);

    client.close();

    if (update.insertedId) {
        res.status(200).json({ status: 200, data: newPicture });
    } else {
    res.status(404).json({ status: 404, message: "Error" });
    }
}

// GET all film stocks options
const getFilmStocks = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect();

    const db = client.db("clicks");
    const filmsStocks = await db.collection("posts").distinct("filmStock");
    
    console.log(filmsStocks);
    if (filmsStocks.length > 0) {
        return res.status(200).json({
            status: 200,
            data: filmsStocks
        });
    }
    return res.status(404).json({ status: 404, message: "Not found!" });
}

// GET posts by filmStock
const getPostsByFilmStock = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect();

    const db = client.db("clicks");
    
    const result = await db.collection("posts").find({ filmStock: req.query.filmStock }).toArray()
    client.close();

    const shuffleResult = result.sort((a,b) => 0.5 - Math.random());

    shuffleResult
    ? res.status(200).json({ status: 200, data: shuffleResult })
    : res.status(404).json({ status: 404, data: "Not Found" });

    
}

// GET posts by user
const getPostsByUser = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options)
    await client.connect();

    const db = client.db("clicks");
    
    const result = await db.collection("posts").find({ user: req.query.user }).toArray()

    client.close();

    const shuffleResult = result.sort((a,b) => 0.5 - Math.random());

    shuffleResult
    ? res.status(200).json({ status: 200, data: shuffleResult })
    : res.status(404).json({ status: 404, data: "Not Found" });
}

//============================COMMENTS & LIKES HANDLERS============================
// POST (add) new comment
const addComments = async (req, res) => {
    const { user, comment, id, nickname, picture } = req.body;

    const client = new MongoClient(MONGO_URI, options)
    await client.connect();

    const db = client.db("clicks");
    
    const result = await db.collection("posts").updateMany(
        { id: id },
        { $push: 
            { comments: 
                { 
                    authorHandle: user, 
                    comment: comment, 
                    nickname: nickname,
                    picture: picture,
                    commentId: uuidv4()
                },
            },
        }
    );

    result.modifiedCount === 1
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, message: "Comment was not added." });

    client.close();
}

// DELETE comment
const deleteComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        console.log(req.body.comment)
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("clicks");

        const result = await db.collection("posts").updateOne(
            { id: postId },
            { $pull: 
                { comments: 
                    {  "authorHandle": comment.authorHandle,
                        "comment": comment.comment,
                        "nickname":comment.nickname,
                        "picture": comment.picture,
                        "commentId": comment.commentId
                    } 
                } 
            }
        );
    
        client.close();
        res.status(200).json({ status: 200, message: "Comment deleted", result: result})
    }
    catch (err) {
        console.log("err", err)
        res.status(404).json({ status: 404, message: "Not Found", error: err });
    }
}

// PATCH updating likes
const updateLikes = async (req, res) => {
    const { id, user } = req.body;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db('clicks');

    // checking in the "likes" array of the picture to see if we find the user
    const searchResult = await db.collection('posts').findOne({ id: id, "likes.user": user });
    
    // if we don't find the user (null) then we push the user in that array
    if (searchResult === null) {
        const addLike = await db.collection('posts').updateOne(
            { id: id },
            {
            $push: {
                likes: {
                user
                },
            },
            }
        );

        client.close();

        addLike.modifiedCount === 1
        ? res.status(200).json({ status: 200, message: 'Successfully Liked' })
        : res.status(404).json({ status: 404, message: 'Not Found' });
    } else {
        // if we DO find the user, we pull that user from the array (meaning they unlike the picture)
        const removeLike = await db.collection('posts').updateOne(
            { id: id },
            {
            $pull: {
                likes: {
                user,
                },
            },
            }
        );

        client.close();

        removeLike.modifiedCount === 1
        ? res.status(201).json({ status: 201, message: 'Successfully unliked' })
        : res.status(404).json({ status: 404, message: 'Not Found' });
    }
};

module.exports = {
    getUser,
    getUsers,
    getPosts,
    getPost,
    uploadPicture,
    addUser,
    updateUser,
    getPostsByFilmStock,
    getFilmStocks,
    getPostsByUser,
    addComments,
    updateLikes,
    deleteComment,
    updateFollow
};