const express = require("express");
const Router = express.Router();

const helperFunction = require('../helpers/helperFunctions');

Router.get("/getEvents", (req, res) => {
  helperFunction.getEvents()
  .then((rows) => {
    console.log(rows);
    res.status(200).send({
      message: "Success",
      rows,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Server Error!"
    });
  });
});


/** MODULE EXPORTS */
module.exports = Router;