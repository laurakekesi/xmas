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
const deleteItemById = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("xmasApp");
    const itemId = req.params.itemId;
    const deleteItem = await db.collection("itemData").deleteOne({_id: ObjectId(itemId)});
    deleteItem?
    res.status(200).json({status: 200, data: deleteItem, message: "Item deleted."})
    : res.status(404).json({status: 404, message: "Item not found :("});
    client.close();
}

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
const updateItemCategory = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("xmasApp");
        const itemId = req.params.itemId;
        const query = {_id: ObjectId(itemId)}
        const newCategory = req.body.category;
        let newValues;
        const itemToUpdate = await db.collection("itemData").findOne(query);
        if (itemToUpdate) {
            newValues = { $set : {category: newCategory}}
        }
        const updatedItem = await db.collection("itemData").updateOne(query, newValues);
        updatedItem.modifiedCount===1?
        res.status(200).json({status: 200, data: updatedItem, message: "Item category updated!"})
        : res.status(404).json({status: 404 ,message: "Item category not updated."})
        client.close();
    }
    catch {
        res.status(500).json({status: 500, message: "Something went wrong... Server error."})
    }

}

const updateItemPrice = async(req,res) => {
    const client = new MongoClient(MONGO_URI,options);
    try {
        await client.connect();
        const db = client.db("xmasApp");
        const itemId = req.params.itemId;
        const query = {_id: ObjectId(itemId)};
        const newPrice = req.body.price;
        let newValues;
        const itemToUpdate = await db.collection("itemData").findOne(query);
        if (itemToUpdate) {
            newValues = { $set : {price: newPrice}}
        }
        const updatedItem = await db.collection("itemData").updateOne(query, newValues);
        updatedItem.modifiedCount===1?
        res.status(200).json({status: 200, data: updatedItem, message: "Item price updated!"})
        : res.status(404).json({status: 404 ,message: "Item price not updated."})
        client.close();        
    }
    catch {
        res.status(500).json({status: 500, message: "Something went wrong... Server error."})
    }
}

const updateItemLink = async(req,res) => {
    const client = new MongoClient(MONGO_URI,options);
    try {
        await client.connect();
        const db = client.db("xmasApp");
        const itemId = req.params.itemId;
        const query = {_id: ObjectId(itemId)};
        const newLink = req.body.link;
        let newValues;
        const itemToUpdate = await db.collection("itemData").findOne(query);
        if (itemToUpdate) {
            newValues = { $set : {link: newLink}}
        }
        const updatedItem = await db.collection("itemData").updateOne(query, newValues);
        updatedItem.modifiedCount===1?
        res.status(200).json({status: 200, data: updatedItem, message: "Item link updated!"})
        : res.status(404).json({status: 404 ,message: "Item link not updated."})
        client.close();        
    }
    catch {
        res.status(500).json({status: 500, message: "Something went wrong... Server error."})
    }    
}



module.exports = {
    getAllItems,
    getItemById,
    getItemsByRecipient,
    deleteItemById,
    createNewItem,
    updateItemCategory,
    updateItemPrice,
    updateItemLink
};
