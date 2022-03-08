const mongoDB = require("mongodb");
require('dotenv').config();
const MongoClient = mongoDB.MongoClient;
const mongoURL = process.env.MONGOURL || "mongodb://localhost:27017";
const ObjectId = mongoDB.ObjectId;
const DATA_BASE = "socialMedia";

const getAllUsers = async (req, res) => {
  const client = await MongoClient.connect(mongoURL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const socialMediaDB = client.db(DATA_BASE);

    const collection = socialMediaDB.collection("users");

    const users = await collection.find().toArray();
    
    const usersList = new Array();
    users.map((user) => {
      const { _id, name, lastName, profilePicture } = user;
      usersList.push({ _id, name, lastName, profilePicture });
    });
    
    res.status(200).send(usersList);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

async function getUserById(req, res) {
  const client = await MongoClient.connect(mongoURL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const socialMediaDB = client.db(DATA_BASE);

    const collection = socialMediaDB.collection("users");

    const query = { _id: ObjectId(req.params.id) };

    const result = await collection.findOne(query);

    res.send(result);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

const editUser = async (req, res) => {
    MongoClient.connect(mongoURL, (error, connection) => {
      if (error) {
        throw error;
      }
      const id = req.params.id;
      const myObj = req.body;
      const socialMediaDB = connection.db(DATA_BASE);
      socialMediaDB
        .collection("users")
        .findOneAndUpdate(
          { _id: ObjectId(id) },
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

async function findUser(req, res) {
  const client = await MongoClient.connect(mongoURL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const socialMediaDB = client.db(DATA_BASE);

    const collection = socialMediaDB.collection("users");

    const query = { email: req.params.email };

    const result = await collection.findOne(query);

    res.send(result);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

async function getFriends(req, res) {
  try {
    const user = await findUserById(req.params.id);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return findUserById(friendId);
      })
    );
    const friendsList = new Array();
    friends.map((friend) => {
      const { _id, name, lastName, profilePicture } = friend;
      friendsList.push({ _id, name, lastName, profilePicture });
    });
    res.status(200).send(friendsList);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function findUserById(id) {
  const client = await MongoClient.connect(mongoURL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const socialMediaDB = client.db(DATA_BASE);

    const collection = socialMediaDB.collection("users");

    const query = { _id: ObjectId(id) };

    const res = await collection.findOne(query);

    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

module.exports = {getAllUsers, findUser, findUserById, getUserById, getFriends, editUser };
