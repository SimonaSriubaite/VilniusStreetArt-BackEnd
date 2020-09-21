const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();

app.use(bp.json());
app.use(cors());

// MySQL connection - creates database if empty

const con = mysql.createConnection(process.env.DB);

con.connect((err) => {
  if (err) throw err;
  con.query("SHOW TABLES LIKE 'vsa'", (err, result) => {
    if (err) console.log(err);
    if (result.length === 0) {
      con.query(
        "CREATE TABLE vsa (id int AUTO_INCREMENT PRIMARY KEY, image TEXT, author TEXT, description TEXT, location TEXT)",
        (err, result) => {
          if (err) console.log(err);
          else console.log("Database created: " + result);
        }
      );
    } else {
      console.log("Connected to database and it is accessible");
    }
  });
});

// GET request to retrieve all vsa

app.get("/", (req, res) => {
  con.query("SELECT * FROM vsa", (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send("Issue getting data");
    } else {
      res.json(result);
    }
  });
});

app.listen(3000, () => console.log("The server is working at port 3000"));
