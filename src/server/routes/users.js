const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
// const { generateRandomString, getUserByEmail } = require('../helpers/helperFunctions');
const helperFunction = require('../helpers/helperFunctions');

let queryString = '';
let email = '';
let password = '';

/** Check user email and password during login*/
Router.get("/:email&:password", (req, res) => {
  email = req.params.email;
  password = decodeURIComponent(req.params.password);
  helperFunction.getUserByEmail(email)
  .then((rows) => {
    if(rows.length === 0) {
      res.send('invalid user')
    } else {
      const passwordFromDB = rows[0].password;
      if(bcrypt.compareSync(password,passwordFromDB)) {
        res.send(rows);
      } else {
        res.send('invalid user');
      };  
    };
  })
  .catch((error) => {
    console.log(error);
    res.send('server error');
  });
});


/** add new user to database thru signup*/
Router.post("/:email&:password", (req, res) => {
  password = bcrypt.hashSync(req.params.password, 10);
  email = req.params.email;
  const type = 'MEM';
  helperFunction.getUserByEmail(email)
  .then((row) => {
    if(row.length === 0) {
      helperFunction.addNewUser(email, password, type)
      .then((rows) => {
        console.log(rows);
      })
      .catch((error) => {
        console.log(error);
        res.send('server error');
      })  
    }
  })
  .catch((error) => {
    console.log(error);
    res.send('server error');
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
      if(row.length === 0) {
        res.send('invalid user');
      } else {
        const token = helperFunction.generateRandomString();
        const newPassword = bcrypt.hashSync(token, 10)
        console.log("New Token Generated: ", token);
        /**update database with new password */
        queryString = `
        UPDATE users SET password='${newPassword}'
        WHERE email = '${email}';`;
        sqlConnection.query(queryString, (err, row, fields) => {
          if(err) {
            console.log('Error updating user password!!');
            res.send(err);
          } else {
            /** send email */
            const transporter = nodemailer.createTransport({
              service: process.env.EMAIL_SERVICE,
              auth: {
                user: process.env.EMAIL_ACCOUNT,
                pass: process.env.EMAIL_PASSWORD
              }
            });
            const message = {
              from: process.env.EMAIL_ACCOUNT,
              to: email,
              subject: 'Password Reset',
              html: '<h4><b>You requested a password reset</b></h4>' + token + '<br /><p>Jain Society Of Calgary</p>'
            };
            transporter.sendMail(message, function(err, info) {
              if (err) {
                res.send('error')
              } else {
                res.send('reset email sent');
              };
          });            
          }
        });
      };
    };
  });
});

Router.post('/changePassword/:email&:currPassword&:newPassword', (req, res) => {
  console.log('in patch...')
  const currPassword = decodeURIComponent(req.params.currPassword);
  const tempPassword = decodeURIComponent(req.params.newPassword);
  const newPassword = bcrypt.hashSync(tempPassword, 10);
  email = req.params.email;
  console.log(email, currPassword, newPassword);
  /** check if user exists */
  queryString = `
  SELECT id, password, type FROM users
  WHERE email = '${email}';`;

  sqlConnection.query(queryString, (err, row, fields) => {
    if (err) {
      console.log('server error');
      res.send('server error');
    } else {
      if(row.length === 0) {
        console.log('Invalid User');
        res.send('invalid user');
      } else {
        const passwordFromDB = row[0].password;
        if(bcrypt.compareSync(currPassword,passwordFromDB)) {
          queryString = `
          UPDATE users SET password='${newPassword}'
          WHERE email = '${email}';`;
          sqlConnection.query(queryString, (err, row, fields) => {
            if (err) {
              console.log('server error update');
              res.send('server error');
            } else {
              console.log('Success');
              res.send('success');
            }
          });
        } else {
          console.log('invalid password');
          res.send('invalid password');
        }
      }
    }
  });
});

module.exports = Router;