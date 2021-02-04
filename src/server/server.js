const express = require('express');
// const mysql = require('mysql');

const app = express();
const port = 8000;
const table ='users';

const sqlPool = require('./lib/db').pool;

app.get('/api/users', (req, res) => {
  sqlPool.query(`select * from ${table}`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});