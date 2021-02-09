const express = require('express');
require('dotenv').config();
const bodyParser 	= require ('body-parser');


const app = express();
const cors = require('cors');
app.use(bodyParser.json());
const port = process.env.PORT || 3030;
app.use(cors());

const usersRoutes = require("./routes/users");
const newsAnnouncementRoutes = require('./routes/newsAnnouncements.js');

app.use("/users", usersRoutes);
app.use("/news", newsAnnouncementRoutes);


app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});