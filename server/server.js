const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const PORT = 6000;

const {
  getAllRecipients,
  getRecipientById,
  createNewRecipient,
  deleteRecipientByID
} = require("./handlers/recipientHandlers");

const {
  getAllItems,
  getItemById,
  createNewItem,
} = require("./handlers/itemHandlers")

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/", (req, res) => {
    res.status(200).json({ status: 200, message: "Howdy!" });
  })

  //Item endpoints
  .get('/api/allItems', getAllItems) // gets all items
  .get('/api/item/:itemId', getItemById) // gets item by item _id
  .post('/api/postItem', createNewItem) // creates new item

  //User endpoints

  //Recipient endpoints
  .get('/api/allRecipients', getAllRecipients) // gets all recipients
  .get('/api/recipient/:recipientId', getRecipientById) // gets recipient by their _id
  .post("/api/postRecipient", createNewRecipient) // creates a new recipient
  .delete('/api/recipient/:recipientId', deleteRecipientByID) // deletes recipient by their _id

  // ITEM TO DO
  //.get('/api/items/:userId', )
  //.delete('/api/item/:itemId', )
  //.patch('/api/itemCategory/:itemId', )
  //.patch('/api/itemLink/:itemId', )
  //.patch('/api/itemPrice/:itemId', )

  // USER TO DO
  //.get('/api/allUsers', )
  //.get('/api/user/:userId', )
  //.post('/api/postUser', )
  //.delete('/api/user/:userId', )
  //.patch('/api/userRecipients/:userId', )  
  
  // RECIPIENT TO DO
  // .patch('/api/recipientGift/:recipientId')
  // .patch('/api/recipientStatus/:recipientId')

  

  .listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`);
  });
