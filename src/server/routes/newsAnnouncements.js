const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db');
const cors = require('cors');
const app = express();
app.use(cors());

/** Get President Message from DB */
Router.get("/presmessage", (req, res) => {
  const queryString = `
  SELECT message 
  FROM news_announcements
  WHERE type='PRESMSG';`;

  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      // console.log(row);
      res.send(row);
    } else {
      res.send(err);
      console.log("Error retrieving president message!!!");
    };
  });
});

Router.post("/presmessage", (req, res) => {

  const message = JSON.stringify(req.body.message);
  // console.log('req.body',req.body)
  // console.log('message',message);

  const queryString = `
  UPDATE news_announcements 
  SET message = '${message}'
  WHERE type = 'PRESMSG';`;

  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      // console.log(row);
      // res.send(row);
    } else {
      res.send(err);
      console.log("Error saving president message!!!");
    };
  });
});

module.exports = Router;