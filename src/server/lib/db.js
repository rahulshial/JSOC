const mysql = require ('mysql');

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    queuelimit: process.env.MYSQL_QUEUELIMIT,
    connectionlimit: process.env.MYSQL_CONNECTIONLIMIT
  };
};

const sqlConnection = mysql.createConnection(dbParams);

sqlConnection.connect((err)=> {
	if(err) {
		console.log(err);
		console.log("Connection Failed...");
	} else {
		console.log('Connected To The DataBase', dbParams.database);
	}
});

module.exports = sqlConnection;

