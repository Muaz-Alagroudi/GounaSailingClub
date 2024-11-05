const express = require("express");
const Router = express.Router();

app.post('/', async (req, res) => {
  const transactionData = req.body;

  if (transactionData.success) {
    console.log(transactionData);
  } else {
    res.status(404).send('fail');
  }

  // Respond to Paymob to acknowledge receipt
  res.status(200).send("Transaction received");
});
module.exports = Router;
