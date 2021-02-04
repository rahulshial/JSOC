const express = require("express");
const Router = express.Router();
const sqlPool = require('../lib/db').pool;

Router.get("/:email/:password", (req, res) => {
  const email = req.params.email;
  const password = req.params.password
  const queryString = `
  SELECT id FROM users
  WHERE email=${email} 
  AND password = ${password};`;

  sqlPool.query(queryString, (err, row, fields) => {
    if (!err) {
      res.send(row)
    } else {
      console.log("Error retreiving users");
    };
  });
});

module.exports = Router;