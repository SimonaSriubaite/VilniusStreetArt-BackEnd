const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();

app.use(bp.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json(users);
});

app.listen(3000, () => console.log("The server is working at port 3000"));
