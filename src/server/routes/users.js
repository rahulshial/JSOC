const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db');

/** Check user email and password */
Router.get("/:email&:password", (req, res) => {
  const email = req.params.email;
  const password = req.params.password;

  console.log(email);
  console.log(password);

  const queryString = `
  SELECT id, type FROM users
  WHERE email = '${email}' 
  AND password = '${password}';`;

  console.log(queryString);

  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      console.log(row);
      res.send(row);
    } else {
      console.log("Error retrieving users data!!!");
    };
  });
});

module.exports = Router;