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
  password = decodeURIComponent(req.params.password);
  console.log(email, password);
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
      console.log(passwordFromDB);
      if(bcrypt.compareSync(password,passwordFromDB)) {
        res.status(200).send({
          message: "User Found!", 
          rows,
          });
      } else {
        console.log('password dos not match')
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
  const decodedPassword = decodeURIComponent(req.params.password);
  console.log(decodedPassword);
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
          res.status(201).send({
            message: "User Created!"
          });
        }
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

Router.post('/signUpActivationLink', (req, res) => {
  const email = req.body.email;
  const decodedPassword = decodeURIComponent(req.body.password);
  const password = bcrypt.hashSync(decodedPassword, 10);
  helperFunction.getUserByEmail(email)
  .then((rows) => {
    if(rows.length === 0) {
      const activation_token = helperFunction.generateRandomString(60);
      const auth_token = helperFunction.generateRandomString(30);
      helperFunction.createActivationRecord(email, password, activation_token, auth_token)
      .then((rows) => {
        if(rows.insertId) {
          helperFunction.sendEmail('Activation', email, activation_token, auth_token)
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

Router.post('/activate', (req, res) => {
  console.log(req.body)
  const email = req.body[0];
  const activationToken = req.body[1];
  const authToken = req.body[2];
  helperFunction.getUserActivationRecord(email)
  .then((rows) => {
    if(rows.length === 0) {
      res.status(204).send({
        message: "User not found!!"
      });
    } else {
      const activationTokenFromDB = rows[0].activation_token;
      const authTokenFromDB = rows[0].auth_token;
      const password = rows[0].password;
      const type = rows[0].type;
      if (activationToken === activationTokenFromDB && authToken === authTokenFromDB) {
        helperFunction.addNewUser(email, password, type)
        .then((rows) => {
          if(rows.insertId) {
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

  console.log(email);
  console.log(activationToken);
  console.log(authToken);
});

/** MODULE EXPORTS */
module.exports = Router;