const {MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
};

//****************** GET HANDLERS ***********************/
const getAllRecipients = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("xmasApp");
    const getUsers = await db.collection("recipientData").find().toArray();
    getUsers?
    res.status(200).json({status: 200, data: getUsers, message: "Users Retrieved!"})
    : res.status(404).json({status: 404, message: "Users not found :("});
    client.close();
}


//****************** DELETE HANDLER ***********************/

//****************** POST HANDLER ***********************/
const createNewRecipient = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("xmasApp");
    const newRecipient = req.body;
    newRecipient.giftIdArray = [];
    newRecipient.complete = false;
    const createRecipient = await db.collection("recipientData").insertOne(newRecipient);
    createRecipient?
    res.status(200).json({status: 200, data: newRecipient, message: "recipient created!"})
    : res.status(404).json({status: 404, message: "recipient not created"});
    client.close();
}


//****************** PATCH HANDLERS ***********************/



module.exports = {
    getAllRecipients,
    createNewRecipient,
}

// const getUsers = async (req, res) => {
//     const client = new MongoClient(MONGO_URI, options);
//     await client.connect();
//     const db = client.db("myFinalProject");
//     const users = await db.collection("users_data").find().toArray();
//     users?
//     res.status(200).json({status: 200, data: users, message: "All users successfully retrieved!"})
//     : res.status(404).json({status: 404, message: "Error retrieving users."});
//     client.close();
// }

// const getUserById = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);
//   await client.connect();
//   const db = client.db("myFinalProject");
//   const _id = req.params.userId;
//   const findUser = await db.collection("users_data").findOne({_id: ObjectId(_id)});
//   findUser?
//   res.status(200).json({status: 200, data: findUser, message: "User successfully retrieved!"})
//   : res.status(404).json({status: 404, message: "No user found with that _id."})
//   client.close();
// }