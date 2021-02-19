const sqlConnection = require('../lib/db');
const nodemailer = require('nodemailer');

/** Global Declarations */
let  queryString = '';
let queryParams = [];

const generateRandomString = function(length) {
  let result             = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^*()[]{}=|><;*';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const sendEmail = (type, email, token1, token2) => {
  let message = '';
  const transporter = 
    nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
      }
    });
    if (type === 'Reset') {
      message = {
        from: process.env.EMAIL_ACCOUNT,
        to: email,
        subject: 'Password Reset',
        html: `
        <h4><b>You requested a password reset</b></h4> 
        ${token} 
        <br /> 
        <p> Change your password after logging in using the above temporary password.</p>
        <br />
        <p>Please contact the system administrator at <a href='calgaryjains@gmail.com'>calgaryjains@gmail.com</a> if you have any issues.</p>
        <p>Jain Society Of Calgary</p>`
      };        
    } else if(type === 'Activation') {
      const activationToken = encodeURIComponent(token1);
      const authToken = encodeURIComponent(token2);
      const URL = `http://localhost:3000/activation/&${activationToken}&auth=${authToken}`
      message = {
        from: process.env.EMAIL_ACCOUNT,
        to: email,
        subject: 'JSOC - Activation Request',
        html: `
        <h4><b>Jain Society of Calgary</b></h4> 
        <br /> 
        <p> Click the link below to activate your JSOC Login Id</p>
        <br />
        <p> This link will expire in 24 hours and can only be used once</p>
        <br /> 
        <p>If the button above doesn’t work, paste this link into your web browser:</p>
        <p>${URL}</p>
        <p>Please contact the system administrator at <a href='calgaryjains@gmail.com'>calgaryjains@gmail.com</a> if you have any issues.</p>
        <p>Jain Society Of Calgary</p>`
      };
      console.log(message); 
    };

    return new Promise(function(resolve, reject) {
      return transporter.sendMail(message, function(error, info) {
      if (error) {
        return reject(error)
      } else {
        return resolve(info);
      }  
    });
  });
};

const initQueryVars = (queryString, queryParams) => {
  queryString = '';
  queryParams = [];
};

const getUserByEmail = (email) => {
  initQueryVars(queryString, queryParams);
  queryParams = [email];
  queryString = `
  SELECT id, email, password, type FROM users
  WHERE email = ?;`;
  return new Promise(function(resolve, reject) {
    return sqlConnection.query(queryString, queryParams, (error, rows, fields) => {
      if(error) {
        return reject(error)
      }
      return resolve(rows);
    });
  });
};

const addNewUser = (email, password, type) => {
  initQueryVars(queryString, queryParams);
  queryParams = [email, password, type];
  queryString = `INSERT INTO users (email, password, type) VALUES (?, ?, ?);`;

  return new Promise(function(resolve, reject) {
    return sqlConnection.query(queryString, queryParams, (error, rows, fields) => {
      if(error) {
        return reject(error)
      }
      return resolve(rows);
    });  
  });
};

const updatePassword = (id, newPassword) => {
  initQueryVars(queryString, queryParams);
  queryParams = [newPassword, id];
  queryString = `UPDATE users SET password = ? WHERE id = ?;`;
  return new Promise(function(resolve, reject) {
    return sqlConnection.query(queryString, queryParams, (error, rows, fields) => {
      if(error) {
        return reject(error)
      }
      return resolve(rows);
    });  
  });
};

const createActivationRecord = (email, password, activation_token, auth_token) => {
  initQueryVars(queryString, queryParams);
  queryParams = [email, password, activation_token, auth_token];
  queryString = `INSERT INTO activation (email, password, activation_token, auth_token) VALUES (?, ?, ?, ?);`;
  return new Promise(function(resolve, reject) {
    return sqlConnection.query(queryString, queryParams, (error, rows, fields) => {
      if(error) {
        return reject(error)
      }
      return resolve(rows);
    });  
  });

};

/** Module Exports */
module.exports = {
  generateRandomString,
  getUserByEmail,
  addNewUser,
  updatePassword,
  sendEmail,
  createActivationRecord,
};