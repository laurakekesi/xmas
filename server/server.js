const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const PORT = 6000;

const {
  getAllRecipients,
  getRecipientById,
  createNewRecipient,
} = require("./handlers/recipientHandlers");

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

  //User endpoints

  //Recipient endpoints
  .get('/api/allRecipients', getAllRecipients) //gets all recipients
  .get('/api/recipient/:recipientId', getRecipientById) //gets recipient by their _id
  .post("/api/postRecipient", createNewRecipient) //creates a new recipient

  //TO DO
  // .delete('/api/recipient/:recipientId')
  // .patch('/api/recipient/gift/:recipientId')
  // .patch('/api/recipient/status/:recipientId')

  .listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`);
  });
