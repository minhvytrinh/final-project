const { MongoClient } = require("mongodb");
const users = require("./data/users.json");
const posts = require("./data/posts.json");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const batchImport = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("clicks");
    console.log("connected!");

    await db.collection("users").insertMany(users);
    await db.collection("posts").insertMany(posts);

    await client.close();
    console.log("disconnected!");
};

batchImport()
