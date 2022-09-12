const express = require('express');
const PORT = 5000;

express()

.get('/', (req, res) => {
  res.status(200).json({status: 200, message: "Howdy!"})
})

.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})