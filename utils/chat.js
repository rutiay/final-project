const mongoDB = require("mongodb");
// const { findUserById } = require("./users");
const MongoClient = mongoDB.MongoClient;
const mongoURL = "mongodb+srv://rutiayaso:abcdef1234@cluster0.uprzh.mongodb.net/socialMedia?retryWrites=true&w=majority"  || "mongodb://localhost:27017";
const ObjectId = mongoDB.ObjectId;
const DATA_BASE = "socialMedia";

const addConversation = async (req, res) => {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const socialMediaDB = connection.db(DATA_BASE);
    const users = [req.body.senderId, req.body.receiverId];
    const obj = { users };
    obj.createDate = new Date();
    socialMediaDB
      .collection("conversations")
      .insertOne(obj, (err, response) => {
        if (err) {
          throw err;
        }
        res.status(201).send(response);
        connection.close();
      });
  });
};

const getUserConversations = async (req, res) => {
  const client = await MongoClient.connect(mongoURL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const socialMediaDB = client.db(DATA_BASE);

    const collection = socialMediaDB.collection("conversations");

    const query = { users: { $in: [req.params.id] } };

    const result = await collection.find(query).toArray();

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const addMessage = async (req, res) => {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const socialMediaDB = connection.db(DATA_BASE);
    const obj = req.body;
    obj.createDate = new Date();
    socialMediaDB.collection("messages").insertOne(obj, (err, response) => {
      if (err) {
        throw err;
      }
      res.status(201).send(response);
      connection.close();
    });
  });
};

const getAllMessages = async (req, res) => {

  const client = await MongoClient.connect(mongoURL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const socialMediaDB = client.db(DATA_BASE);

    const collection = socialMediaDB.collection("messages");

    const query = { conversationId: req.params.conversationId };

    const result = await collection.find(query).toArray();

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getConversation = async (req, res) => {
  const client = await MongoClient.connect(mongoURL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const socialMediaDB = client.db(DATA_BASE);

    const collection = socialMediaDB.collection("conversations");

    const query = { users: { $all: [req.params.firstId, req.params.secondId] } };

    const result = await collection.findOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

module.exports = { addConversation, getUserConversations, addMessage, getAllMessages , getConversation};
