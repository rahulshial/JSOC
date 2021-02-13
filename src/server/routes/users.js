const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { generateRandomString } = require('../helpers/helperFunctions');

let queryString = '';
let email = '';
let password = '';
/** Check user email and password during login*/
Router.get("/:email&:password", (req, res) => {
  email = req.params.email;
  password = req.params.password;

  queryString = `
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
  email = req.params.email;
  queryString = `
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
  password = bcrypt.hashSync(req.params.password, 10);
  email = req.params.email;
  queryString = `
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

Router.post('/password-reset/:email', (req, res) => {
  email = req.params.email;
  /** check if user exists */
  queryString = `
  SELECT id FROM users
  WHERE email = '${email}';`;
  sqlConnection.query(queryString, (err, row, fields) => {
    if(err) {
      res.send(err);
    } else {
      console.log(row.length);
      if(row.length === 0) {
        res.send('invalid user');
      } else {
        // const token = crypto.randomBytes(4).toString('hex')//creating the token to be sent to the forgot password form (react)
        const token = generateRandomString();
        const newPassword = bcrypt.hashSync(token, 10) //hashing the password to store in the db node.js
        console.log(token, newPassword);
        /**update database with new password */
        queryString = `
        UPDATE users SET password='${newPassword}'
        WHERE email = '${email}';`;
        sqlConnection.query(queryString, (err, row, fields) => {
          if(err) {
            console.log('Error updating user password!!');
            res.send(err);
          } else {}
        });
      };
    };
  });
});

module.exports = Router;