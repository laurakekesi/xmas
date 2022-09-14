const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//****************** GET HANDLERS ***********************/
const getAllItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("xmasApp");
  const getItems = await db.collection("itemData").find().toArray();
  getItems
    ? res
        .status(200)
        .json({ status: 200, data: getItems, message: "All items retrieved!" })
    : res.status(404).json({ status: 404, message: "Items not found :(" });
  client.close();
};

const getItemById = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("xmasApp");
    const itemId = req.params.itemId;
    const getItem = await db.collection("itemData").findOne({_id: ObjectId(itemId)});
    getItem?
    res.status(200).json({status: 200, data: getItem, message: "Item retrieved!"})
    : res.status(404).json({status: 404, message: "Item not found :("});
    client.close();
}

const getItemsByRecipient = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("xmasApp");
    const recipientId = req.params.recipientId;
    const getItems = await db.collection("itemData").find({recipientId: recipientId}).toArray();
    getItems?
    res.status(200).json({status: 200, data: getItems, message: "Items retrieved!"})
    : res.status(404).json({status: 404, message: "Items not found :("});
    client.close();
}

//****************** DELETE HANDLER ***********************/

//****************** POST HANDLER ***********************/
const createNewItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("xmasApp");
  const newItem = req.body;
  newItem.category = "idea";
  newItem.price = 0;
  newItem.link = "";
  const createItem = await db.collection("itemData").insertOne(newItem);
  createItem
    ? res
        .status(200)
        .json({ status: 200, data: newItem, message: "Item posted!" })
    : res.status(404).json({ status: 404, message: "Item not created :(" });
  client.close();
};

//****************** PATCH HANDLERS ***********************/

module.exports = {
    getAllItems,
    getItemById,
    getItemsByRecipient,
    createNewItem,
};
