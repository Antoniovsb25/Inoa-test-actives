const cors = require("cors");
const express = require("express");
const axios = require("axios");
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const API_KEY = "9QEY0OOLLBS1YIX5";
const BASE_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=PETR4.SA&apikey=${API_KEY}`;
const PORT = "4567";

app.post("/", (req, res) => {
    res.send(req.body)
})

app.get("/", async (req, res) => {
  const { data } = await axios(BASE_URL);
  console.log(response)
  return res.json(data);
});

app.listen(PORT);
