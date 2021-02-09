const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db');

/** Check user email and password */
Router.get("/presmessage", (req, res) => {

  const queryString = `
  SELECT message 
  FROM news_announcements
  WHERE type='PRESMSG';`;

  console.log(queryString);

  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      console.log(row);
      res.send(row);
    } else {
      res.send(err);
      console.log("Error retrieving president message!!!");
    };
  });
});

module.exports = Router;