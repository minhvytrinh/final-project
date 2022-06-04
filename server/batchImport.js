const { MongoClient } = require("mongodb");
const users = require("./data/users.json");

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

    await client.close();
    console.log("disconnected!");
};

batchImport()
