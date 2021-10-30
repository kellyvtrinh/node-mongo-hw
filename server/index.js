const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/mongo-node-hw"; // change this as needed

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

const Schema = mongoose.Schema;

const item = new Schema({
  image_url: String,
  date: String 
})

const APODS = mongoose.model("APODS", item)

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// The method of the root url. Be friendly and welcome our user :)
router.get("/", function (req, res) {
  res.json({ message: "Welcome to the APOD app." });
});

router.get("/favorite", function (req, res) {
  APODS.find().then((apods) => {
    res.json({ message: "Return all apods.", apods: apods})
  })
});

router.post("/add", function (req, res) {
  // update apod status
  console.log(req)
  // const url = req.body.image_url;
  // const img_date = req.body.date;
  // const apods = new APODS({
  //   image_url: url,
  //   date: img_date
  // })
  // apods.save((error, document) => {
  //   if (error) {
  //     res.json({ status : "failure"})
  //   } else {
  //     res.json({
  //       status : "success", 
  //       id: apods._id,  
  //       content: req.body
  //     })
  //   }
  // }) 
});

router.route("/delete")
.get((req, res) => {
  APODS.find({date: req.body.date}, (error, apod) => {
    if (error) {
      res.json({ status : "failure"})
    } else {
      res.json(apod)
    }
  })
})
.delete((req, res) => {});



app.use("/api", router); // API Root url at: http://localhost:8080/api

app.listen(port);
console.log("Server listenning on port " + port);
