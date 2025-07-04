var express = require('express');
var app = express();
var bodyParser = require("body-parser");
require('dotenv').config();

console.log("Hello World");

app.use(function(req, res, next){
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
},
(req, res) => {
  res.send({ "time": req.time });
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.get('/name', (req, res) => {
  var first = req.query.first;
  var last = req.query.last;
  res.json({"name": `${first} ${last}`});
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ "message": "HELLO JSON" });
  } else {
    res.json({ "message": "Hello json" });
  }
})

app.post("/name", function(req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({ "name": string });
});

module.exports = app;
