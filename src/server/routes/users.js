const express = require("express");
const Router = express.Router();
const bcrypt = require('bcrypt');
 
const helperFunction = require('../helpers/helperFunctions');

let email = '';
let password = '';
let type = '';

  
/** SIGN IN Route */
Router.get("/:email&:password", (req, res) => {
  email = req.params.email;
  console.log('From REQ: ',req.params.password);
  password = decodeURIComponent(req.params.password);
  console.log('decoded: ', password);
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


/** CREATE ACCOUNT Route*/
Router.post("/:email&:password", (req, res) => {
  const decodedPassword = decodeURIComponent(req.params.password);
  password = bcrypt.hashSync(decodedPassword, 10);
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
          res.status(200).send({
            message: "User Created!"
          });
        }
      }) 
    } else {
      res.status(201).send({
        message: "User already exists!"
      });
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
        message: "User not found!!"
      });
    } else {
      const id = rows[0].id;
      const token1 = helperFunction.generateRandomString(16)
      const newPassword = bcrypt.hashSync(token1, 10);
      helperFunction.updatePassword(id, newPassword)
      .then((rows) => {
        if(rows.affectedRows === 1) {
          helperFunction.sendEmail('Reset', email, token1)
          .then((info) => {
            res.status(200).send({
              message: "Reset Email Sent!"
            });
          })  
        }
      })   
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
      res.status(204).send({
        message: "User not Found"
      });
    } else {
      const passwordFromDB = rows[0].password;
      if (!bcrypt.compareSync(currPassword,passwordFromDB)) {
        res.status(206).send({
          message: "Password does not match"
        });
      } else {
        const id = rows[0].id
        helperFunction.updatePassword(id, newPassword)
        .then((rows) => {
          if(rows.affectedRows === 1) {
            res.status(200).send({
              message: "Password Changed"
            });
          }
        })
      };
    };
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send({
      message: "Server Error!"
    });
  });
});

/** SIGN UP ACTIVATION LINK EMAIL Route */
Router.post('/signUpActivationLink/:email', (req, res) => {
  const email = req.params.email;
  helperFunction.getUserByEmail(email)
  .then((rows) => {
    if(rows.length === 0) {
      const token1 = helperFunction.generateRandomString(60);
      const activationToken = bcrypt.hashSync(token1, 10);
      const token2 = helperFunction.generateRandomString(30);
      const authToken = bcrypt.hashSync(token2, 10);
      helperFunction.createActivationRecord(email, activationToken, authToken)
      .then((rows) => {
        if(rows.insertId) {
          helperFunction.sendEmail('Activation', email, token1, token2)
          .then((info) => {
            res.status(200).send({
              message: "Activaton Email Sent!"
            });
          })
        }
      })   
    } else {
      res.status(201).send({
        message: "User already exists!"
      });
    };
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send({
      message: "Server Error!"
    });
  });  
});

/**PROCESS ACTIVATON LINK FROM EMAIL Route */
Router.post('/activate', (req, res) => {
  const email = req.body.email;
  const activationToken = req.body.activationToken;
  const authToken = req.body.authToken;
  helperFunction.getUserActivationRecord(email)
  .then((rows) => {
    if(rows.length === 0) {
      res.status(204).send({
        message: "User not found!!"
      });
    } else {
      const activationTokenFromDB = rows[0].activation_token;
      const authTokenFromDB = rows[0].auth_token;
      if ((bcrypt.compareSync(activationToken,activationTokenFromDB)) && (bcrypt.compareSync(authToken,authTokenFromDB))) {
        helperFunction.deleteUserActivationRecord(email)
        .then((rows) => {
          if(rows.affectedRows === 1) {
            res.status(200).send({
              message: 'User Activated',
            })
          } else {
            res.status(500).send({
              message: "Server Error!"
            });
          };
        })
      };
    };
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send({
      message: "Server Error!"
    });
  });
});

/** MODULE EXPORTS */
module.exports = Router;