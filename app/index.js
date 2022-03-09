const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;
const config = {
  host: "mysql",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.log("Database connection failed.", err);
  } else {
    console.log("Database connected.");
  }
});

const createPeople = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`;
connection.query(createPeople);

const insertSQL = `INSERT into people(name) values('Ricardo Manso')`;
connection.query(insertSQL);

app.get("/", (req, res) => {
  const selectSQL = `SELECT * FROM people LIMIT 1`;
  connection.query(selectSQL, (err, result) => {
    if (err) {
      console.log("select query error", err);
    } else {
      res.send(`<h1>Full Cycle Rocks!!!</h1> 🔥🔥🔥 by ${result[0].name}`);
      // connection.end();
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
