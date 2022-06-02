const cors = require("cors");
const express = require("express");
const axios = require("axios");
var bodyParser = require("body-parser");

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(cors());

const API_KEY = "9QEY0OOLLBS1YIX5";
const PORT = "4567";

app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.query.activeName}&apikey=${API_KEY}`
    );
    return res.json(data);
  } catch (error) {
    res.send("Something went wrong", error);
  }
});

app.listen(PORT);
