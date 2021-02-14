const sqlConnection = require('../lib/db');


/** Global Declarations */
let  queryString = '';
let queryParams = [];


const generateRandomString = function() {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^*()[]{}=|><;*';
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
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
  queryString = `
  INSERT INTO users (email, password, type)
  VALUES (?, ?, ?);`;

  return new Promise(function(resolve, reject) {
    return sqlConnection.query(queryString, (error, rows, fields) => {
      if(error) {
        return reject(error)
      }
      return resolve(rows);
    });  
  });
};

module.exports = {
  generateRandomString,
  getUserByEmail,
  addNewUser,
};