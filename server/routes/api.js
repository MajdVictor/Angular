//importing modules
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const News = require("../models/news");
const mongoose = require("mongoose");
const db ="mongodb://localhost/thdb";
const bcrypt = require("bcryptjs");
const news = require("../models/news");
var Request = require("request");

//Connecting to mongoDB
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error("Error!" + err);
    } else {
      console.log("Connected to mongodb");
    }
  }
);

/**
 *
 * This function verifies the token for every incoming request
 */
function verifyToken(req, res, next) {
  //if there is no token provided in the header
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }

  //assigning the token in the header
  let token = req.headers.authorization.split(" ")[1];

  //if token is null
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }

  //verifying token with the secretKey
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }

  req.userId = payload.subject;
  next();
}

router.get("/", (req, res) => {
  res.send("From API route");
});

/**
 * POST Request to register new user
 */
router.post("/api/register", (req, res) => {
  //read userData from request body
  let userData = req.body;

  //hashing the password in the userData
  userData.password = bcrypt.hashSync(userData.password, 10);

  //create new user by using User schema
  let user = new User(userData);

  //check if email exists in the database
  User.findOne({ email: userData.email }, (error, existingUser) => {
    if (error) {
      console.log(error);
    }

    //saving the user into the database
    if (existingUser == null) {
      user.save((err, registeredUser) => {
        if (err) {
          console.log(err);
        } else {
          let payload = { subject: registeredUser._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      });
    } else {
      //if the email exists in database, send back error message
      res.status(400).send("Duplicate Email address!");
    }
  });
});

//POST Request to login users
router.post("/api/login", (req, res) => {
  //read userData from request body
  let userData = req.body;

  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    }

    //if user doesn't exist in the database
    if (!user) {
      res.status(401).send("Invalid email or password");
    } else {
      //if user exists, it compares the hashed passwored in the database with the hashed password value
      if (bcrypt.compareSync(userData.password, user.password)) {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });
      } else {
        //if user doesn't exists, it sends an error to the user
        res.status(401).send("Invalid email or password");
      }
    }
  });
});

//GET Request to get all news from the database and send back to user
router.get("/api/news", (req, res) => {
  News.find({}).then(function (news) {
    res.send(news);
  });
});

//POST Request to add news article
router.post("/api/news", verifyToken, (req, res) => {
  let newsData = req.body;

  News.create(newsData, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//Delete Request which deletes a single news article based on news ID.
router.delete("/api/news/:id", verifyToken, (req, res, next) => {
  News.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting news failed!",
      });
    });
});

//GET Request whcih retrieves a single news article based on parameter ID provided by the frontend
router.get("/api/news/:id", verifyToken, (req, res, next) => {
  News.findById(req.params.id)
    .then((news) => {
      if (news) {
        res.status(200).send(news);
      } else {
        res.status(404).send({ message: "News not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching news failed!",
      });
    });
});

//UPDATE request used to update a single news article which has the ID passed in request parameter
router.put("/api/news/:id", verifyToken, (req, res, next) => {
  const news = req.body;
  News.updateOne({ _id: req.params.id }, news)

    .then((result) => {
      res.status(200).json({ message: "Update successful!" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't udpate post!",
      });
    });
});

//GET request which calls external API provided by DIT to get back events in a specific room
router.get("/api/events/", (req, res) => {
  Request.get(
    `https://thabella.th-deg.de/thabella/opn/period/findByRoom/${req.query.roomId}/${req.query.date}%20${req.query.hour}`,
    (error, response, body) => {
      if (error) {
        res.status(401).send(error);
      }
      res.status(200).json(response);
    }
  );
});

module.exports = router;
