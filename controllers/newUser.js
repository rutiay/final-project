const mongoDB = require("mongodb");
require('dotenv').config();
const MongoClient = mongoDB.MongoClient;
const mongoURL = process.env.MONGOURL || "mongodb://localhost:27017";
// const ObjectId = mongoDB.ObjectId;
const DATA_BASE = "socialMedia";

const register = (req, res) => {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const socialMediaDB = connection.db(DATA_BASE);
    const obj = req.body;
    if (obj != undefined) {
      socialMediaDB.collection("users").insertOne(obj, (err, response) => {
        if (err) {
          throw err;
        }
        res.sendStatus(201);
        connection.close();
      });
    } else {
      res.sendStatus(400);
    }
  });
}


const addDetails = (req, res) => {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const email = req.body.email;
    const myObj = req.body;
    const socialMediaDB = connection.db(DATA_BASE);
    socialMediaDB
      .collection("users")
      .findOneAndUpdate(
        { email: email },
        { $set: myObj },
        (err, response) => {
          if (err) {
            throw err;
          }
          if (response.value) {
            res.send(response);
          } else {
            res.sendStatus(404);
          }
          connection.close();
        }
      );
  });
}


module.exports = {register, addDetails}