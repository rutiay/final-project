const mongoDB = require("mongodb");
require('dotenv').config();
const { findUserById } = require("./users.js");
const MongoClient = mongoDB.MongoClient;
const mongoURL = process.env.MONGOURL || "mongodb://localhost:27017";
const ObjectId = mongoDB.ObjectId;
const DATA_BASE = "socialMedia";


const addToFollowings = async (req, res) => {
  const userToFollow = await findUserById(req.params.id);
  if (!userToFollow.followers.includes(req.body._id)) {
    MongoClient.connect(mongoURL, (error, connection) => {
      if (error) {
        throw error;
      }
      const socialMediaDB = connection.db(DATA_BASE);
      socialMediaDB
        .collection("users")
        .findOneAndUpdate(
          { _id: ObjectId(req.body._id) },
          { $push: { followings: req.params.id } },
          (err, response) => {
            if (err) {
              throw err;
            }
            if (response.value) {
              addToFollowers(req, res);
            } else {
              res.sendStatus(404);
            }
            connection.close();
          }
        );
    });
  } else {
    res.status(403).send('you already follow this user');
  }
};

const addToFollowers = (req, res) => {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const socialMediaDB = connection.db(DATA_BASE);
    socialMediaDB
      .collection("users")
      .findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $push: { followers: req.body._id } },
        (err, response) => {
          if (err) {
            throw err;
          }
          if (response.value) {
            res.status(200).send("succsses! you now follow this user");
          } else {
            res.sendStatus(404);
          }
          connection.close();
        }
      );
  });
}

const removeFromFollowings = async (req, res) => {
  const userToUnfollow = await findUserById(req.params.id);
  if (userToUnfollow.followers.includes(req.body._id)) {
    MongoClient.connect(mongoURL, (error, connection) => {
      if (error) {
        throw error;
      }
      const socialMediaDB = connection.db(DATA_BASE);
      socialMediaDB
        .collection("users")
        .findOneAndUpdate(
          { _id: ObjectId(req.body._id) },
          { $pull: { followings: req.params.id } },
          (err, response) => {
            if (err) {
              throw err;
            }
            if (response.value) {
              removeFromFollowers(req, res);
            } else {
              res.sendStatus(404);
            }
            connection.close();
          }
        );
    });
  } else {
    res.status(403).send("you dont follow this user");
  }
};

const removeFromFollowers = (req, res) => {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const socialMediaDB = connection.db(DATA_BASE);
    socialMediaDB
      .collection("users")
      .findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $pull: { followers: req.body._id } },
        (err, response) => {
          if (err) {
            throw err;
          }
          if (response.value) {
            res.status(200).send('you unfollowed this user');
          } else {
            res.sendStatus(404);
          }
          connection.close();
        }
      );
  });
}

module.exports = { addToFollowings, removeFromFollowings };
