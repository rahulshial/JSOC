const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db.js');
const sqlPool = require('./lib/db').pool;

Router.get("/login", (req, res) => {
  const queryString = `SELECT * FROM users;`;
  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      res.send(row)
    } else {
      console.log("Error retreiving users");
    };
  });
});

module.exports = Router;