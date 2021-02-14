const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db');
const bcrypt = require('bcrypt');

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
  .then((rows) => {
    if(rows.length === 0) {
      helperFunction.addNewUser(email, password, type)
      .then((rows) => {
        console.log(rows.insertId);
        if(rows.insertId) {
          console.log('success')
          res.send('success');
        }
      })
      .catch((error) => {
        console.log(error);
        res.send('server error');
      })  
    } else {
      console.log('user exists')
      res.send('user exists');
    };
  })
  .catch((error) => {
    console.log(error);
    res.send('server error');
  });
});

Router.post('/password-reset/:email', (req, res) => {
  email = req.params.email;
  helperFunction.getUserByEmail(email)
  .then((rows) => {
    if(rows.length === 0) {
      res.send('invalid user');
    } else {
      const id = rows[0].id;
      const token = helperFunction.generateRandomString()
      const newPassword = bcrypt.hashSync(token, 10);
      console.log(newPassword);
      helperFunction.updatePassword(id, newPassword)
      .then((rows) => {
        console.log(rows.affectedRows);
        if(rows.affectedRows === 1) {
          helperFunction.sendPasswordResetEmail(email, token)
          .then((info) => {
            res.send('success')
          })
          .catch((error) => {
            console.log(error);
            res.send('email error');
          });  
        }
      })
      .catch((error) => {
        console.log(error);
        res.send('server error');
      });    
    }
  })
  .catch((error) => {
    console.log(error);
    res.send('server error');
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