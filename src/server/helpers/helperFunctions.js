const sqlConnection = require('../lib/db');

const generateRandomString = function() {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^*()[]{}=|><;*';
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getUserByEmail = (email) => {
  let userObject = {};
  const queryString = `
  SELECT id, password, type FROM users
  WHERE email = '${email}';`;

  return sqlConnection.query(queryString, (err, row, fields) => {
    if (err) {
      return userObject = {
        error: err,
      }
    } else {
      userObject = {
        id: row[0].id,
        password: row[0].password,
        type: row[0].type,
      };
      console.log('helper userObject: ', userObject);
      return userObject;
    };
  });
};

module.exports = {
  generateRandomString,
  getUserByEmail,
};