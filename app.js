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

// POST request to add artwork to database

app.post("/", (req, res) => {
  if (req.body.image && req.body.location) {
    con.query(
      `INSERT INTO vsa (image, author, description, location) VALUES ('${req.body.image}', '${req.body.author}', '${req.body.description}', '${req.body.location}')`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error inserting a task");
        } else {
          res.json(result);
        }
      }
    );
  } else {
    res.status(400).send("No street art has been passed");
  }
});

// Getting port from env file or resorting to default

const port = process.env.PORT || 3000;

// Starting the application on defined port

app.listen(port, () => console.log("The server is running on port: " + port));
