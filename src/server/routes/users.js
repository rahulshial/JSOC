const express = require("express");
const Router = express.Router();
const bcrypt = require('bcrypt');
const emailValidator = require('deep-email-validator');
 
const helperFunction = require('../helpers/helperFunctions');

let email = '';
let password = '';
let type = '';

async function isEmailValid(email) {
  return emailValidator.validate(email)
};
  
/** SIGN IN Route */
Router.get("/:email&:password", (req, res) => {
  email = req.params.email;
  password = decodeURIComponent(req.params.password);
  if (!email || !password){
    res.status(206).send({
    message: "Email or password missing!."
    });
  };

  helperFunction.getUserByEmail(email)
  .then((rows) => {
    if(rows.length === 0) {
      res.status(204).send({
        message: "No such User."
        });
    } else {
      const passwordFromDB = rows[0].password;
      if(bcrypt.compareSync(password,passwordFromDB)) {
        res.status(200).send({
          message: "User Found!", 
          rows,
          });
      } else {
        res.status(206).send({
          message: "Password does not match!"
          });
      };  
    };
  })
  .catch((error) => {
      res.status(500).send({
      message: "Server Error!"
      });
  });
});


/** SIGN UP Route*/
Router.post("/:email&:password", (req, res) => {
  password = bcrypt.hashSync(req.params.password, 10);
  email = req.params.email;
  type = 'MEM';
  if (!email || !password){
    return res.status(206).send({
      message: "Email or password missing."
    });
  };
  helperFunction.getUserByEmail(email)
  .then((rows) => {
    if(rows.length === 0) {
      helperFunction.addNewUser(email, password, type)
      .then((rows) => {
        if(rows.insertId) {
          res.status(201).send({
            message: "User Created!"
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({
          message: "Server Error!"
        });
      })  
    } else {
      res.status(200).send({
        message: "User already exists!"
      });
      res.send('user exists');
    };
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send({
      message: "Server Error!"
    });
  });
});

/**PASSWORD RESET Route */
Router.post('/password-reset/:email', (req, res) => {
  email = req.params.email;
  helperFunction.getUserByEmail(email)
  .then((rows) => {
    if(rows.length === 0) {
      res.status(204).send({
        message: "User email not found!!"
      });
    } else {
      const id = rows[0].id;
      const token = helperFunction.generateRandomString()
      const newPassword = bcrypt.hashSync(token, 10);
      helperFunction.updatePassword(id, newPassword)
      .then((rows) => {
        if(rows.affectedRows === 1) {
          helperFunction.sendPasswordResetEmail(email, token)
          .then((info) => {
            res.status(200).send({
              message: "Reset Email Sent!"
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send({
              message: "Server Error!"
            });
          });  
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({
          message: "Server Error!"
        });
      });    
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send({
      message: "Server Error!"
    });
  });
});

/** CHANGE PASSWORD Route */
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
            res.send('success');
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

/** MODULE EXPORTS */
module.exports = Router;