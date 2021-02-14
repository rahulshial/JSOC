const express = require("express");
const Router = express.Router();
const bcrypt = require('bcrypt');

const helperFunction = require('../helpers/helperFunctions');

let email = '';
let password = '';
let type = '';

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
  type = 'MEM';
  helperFunction.getUserByEmail(email)
  .then((rows) => {
    if(rows.length === 0) {
      helperFunction.addNewUser(email, password, type)
      .then((rows) => {
        if(rows.insertId) {
          res.send('success');
        }
      })
      .catch((error) => {
        console.log(error);
        res.send('server error');
      })  
    } else {
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
      helperFunction.updatePassword(id, newPassword)
      .then((rows) => {
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
  const currPassword = decodeURIComponent(req.params.currPassword);
  const tempPassword = decodeURIComponent(req.params.newPassword);
  const newPassword = bcrypt.hashSync(tempPassword, 10);
  email = req.params.email;

  helperFunction.getUserByEmail(email)
  .then((rows) => {
    if(rows.length === 0) {
      res.send('invalid user');
    } else {
      const passwordFromDB = rows[0].password;
      if (!bcrypt.compareSync(currPassword,passwordFromDB)) {
        res.send('invalid password');
      } else {
        const id = rows[0].id
        helperFunction.updatePassword(id, newPassword)
        .then((rows) => {
          if(rows.affectedRows === 1) {
            res.send('Success');
          }
        })
        .catch((error) => {
          console.log(error);
          res.send('server error');
        });
      };
    };
  })
  .catch((error) => {
    console.log(error);
    res.send('server error');
  });
});

module.exports = Router;