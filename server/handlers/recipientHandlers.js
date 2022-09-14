const {MongoClient, ObjectId} = require("mongodb");
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

const getRecipientById = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("xmasApp");
    const userId = req.params.recipientId;
    const findRecipient = await db.collection("recipientData").findOne({_id : ObjectId(userId)});
    findRecipient? 
    res.status(200).json({status: 200, data: findRecipient, message: "Recipient found!"})
    : res.status(404).json({status: 404, message: "Recipient not found :("});
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
    getRecipientById,
    createNewRecipient,
}



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