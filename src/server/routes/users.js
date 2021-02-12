const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db');
const bcrypt = require('bcrypt');

/** Check user email and password during login*/
Router.get("/:email&:password", (req, res) => {
  const email = req.params.email;
  const password = req.params.password;

  const queryString = `
  SELECT id, password, type FROM users
  WHERE email = '${email}';`;

  sqlConnection.query(queryString, (err, row, fields) => {
    if (err) {
      res.send(err);
      console.log("Error retrieving users data!!!");
    } else {
      /** verify password else send back error */
      const passwordFromDB = row[0].password;
      if(bcrypt.compareSync(password,passwordFromDB)) {
        res.send(row);
      } else {
        res.send('invalid password');
      }
    };
  });
});


/** check if user exists during signup*/
Router.get("/:email", (req, res) => {
  const email = req.params.email;
  const queryString = `
  SELECT id, password, type FROM users
  WHERE email = '${email}';`;

  sqlConnection.query(queryString, (err, row, fields) => {
    if (err) {
      res.send(err);
      console.log("Error retrieving users data!!!");
    } else {
      res.send(row);
    };
  });
});

/** add new user to database thru signup*/
Router.post("/:email&:password", (req, res) => {
  const password = bcrypt.hashSync(req.params.password, 10);
  const email = req.params.email;
  const queryString = `
  INSERT INTO users (email, password, type)
  VALUES ('${email}','${password}','MEM');`;

  sqlConnection.query(queryString, (err, row, fields) => {
    if (err) {
      res.send(err);
      console.log("Error adding users data!!!");
    } else {
      res.send('success');
    }
  });
});

module.exports = Router;