const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/hw-nodemongo"; // change this as needed

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
  const url = req.body.image_url;
  const img_date = req.body.date;
  const apods = new APODS({
    image_url: url,
    date: img_date
  })
  apods.save((error, document) => {
    if (error) {
      res.json({ status : "failure"})
    } else {
      res.json({
        image_url: url,
        date: img_date
      })
    }
  }) 
});

router.delete("/delete", (req, res) => {
  APODS.findOneAndDelete({date : req.body.date}).then(() => {
    res.json({message: "delete success"})
  })
});


app.use(cors());
app.use("/api", router); // API Root url at: http://localhost:8080/api


app.listen(port);
console.log("Server listenning on port " + port);
