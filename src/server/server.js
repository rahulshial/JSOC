const express = require('express');
// const mysql = require('mysql');
require('dotenv').config();

const app = express();
const cors = require('cors');
const port = process.env.PORT || 3030;
app.use(cors());

const usersRoutes = require("./routes/users");
const newsAnnouncementRoutes = require('./routes/newsAnnouncements.js');

app.use("/users", usersRoutes);
app.use("/news", usersRoutes);


app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});