const mongoDB = require("mongodb");
require('dotenv').config();
const { findUserById } = require("./users");
const MongoClient = mongoDB.MongoClient;
const mongoURL = process.env.MONGOURL || "mongodb://localhost:27017";
const ObjectId = mongoDB.ObjectId;
const DATA_BASE = "socialMedia";

const getPost = async (req, res) => {
  try {
    const post = await findPost(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUserPosts = async (req, res) => {
  try {
    const currentUser = await findUserById(req.params.id);
    const userPosts = await getAllPostsOfUser(currentUser._id.toString());
    res.send(userPosts);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getPosts = async (req, res) => {
  try {
    const currentUser = await findUserById(req.params.id);
    const userPosts = await getAllPostsOfUser(currentUser._id.toString());
    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return getAllPostsOfUser(friendId);
      })
    );
    console.log(userPosts);
    res.send(userPosts.concat(...friendsPosts));
  } catch (err) {
    res.status(500).send(err);
  }
};

const addPost = (req, res) => {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const socialMediaDB = connection.db(DATA_BASE);
    const obj = req.body;
    obj.createDate = new Date();
    if (obj !== undefined) {
      socialMediaDB.collection("posts").insertOne(obj, (err, response) => {
        if (err) {
          throw err;
        }
        res.status(201).send(response);
        connection.close();
      });
    } else {
      res.status(400).send("cant create an empty post");
    }
  });
};

const editPost = async (req, res) => {
  const post = await findPost(req.params.id);
  if (post.userId === req.body.userId) {
    MongoClient.connect(mongoURL, (error, connection) => {
      if (error) {
        throw error;
      }
      const socialMediaDB = connection.db(DATA_BASE);
      socialMediaDB
        .collection("posts")
        .findOneAndUpdate(
          { _id: ObjectId(post._id) },
          { $set: req.body },
          (err, response) => {
            if (err) {
              throw err;
            }
            if (response.value) {
              res.status(200).send("post updated");
            } else {
              res.sendStatus(404);
            }
            connection.close();
          }
        );
    });
  } else {
    res.status(403).send("you cant edit this post");
  }
};

const deletePost = async (req, res) => {
  const post = await findPost(req.params.id);
  if (post.userId === req.body.userId) {
    MongoClient.connect(mongoURL, (error, connection) => {
      if (error) {
        throw error;
      }
      const socialMediaDB = connection.db(DATA_BASE);
      socialMediaDB
        .collection("posts")
        .findOneAndDelete({ _id: ObjectId(post._id) }, (err, response) => {
          if (err) {
            throw err;
          }
          if (response.value) {
            res.status(200).send("post deleted");
          } else {
            res.sendStatus(404);
          }
          connection.close();
        });
    });
  } else {
    res.status(403).send("you cant delete this post");
  }
};

const likePost = async (req, res) => {
  try {
    const post = await findPost(req.params.id);
    if (!post.likes.includes(req.body._id)) {
      MongoClient.connect(mongoURL, (error, connection) => {
        if (error) {
          throw error;
        }
        const socialMediaDB = connection.db(DATA_BASE);
        socialMediaDB
          .collection("posts")
          .findOneAndUpdate(
            { _id: ObjectId(post._id) },
            { $push: { likes: req.body._id } },
            (err, response) => {
              if (err) {
                throw err;
              }
              if (response.value) {
                res.status(200).send("you liked the post");
              } else {
                res.sendStatus(404);
              }
              connection.close();
            }
          );
      });
    } else {
      MongoClient.connect(mongoURL, (error, connection) => {
        if (error) {
          throw error;
        }
        const socialMediaDB = connection.db(DATA_BASE);
        socialMediaDB
          .collection("posts")
          .findOneAndUpdate(
            { _id: ObjectId(post._id) },
            { $pull: { likes: req.body._id } },
            (err, response) => {
              if (err) {
                throw err;
              }
              if (response.value) {
                res.status(200).send("you disliked the post");
              } else {
                res.sendStatus(404);
              }
              connection.close();
            }
          );
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// const addComment = async (req, res) => {
//   try {
//     const post = await findPost(req.params.id);
//     MongoClient.connect(mongoURL, (error, connection) => {
//       if (error) {
//         throw error;
//       }
//       const socialMediaDB = connection.db(DATA_BASE);
//       socialMediaDB
//         .collection("posts")
//         .findOneAndUpdate(
//           { _id: ObjectId(post._id) },
//           { $push: { comments: req.body } },
//           (err, response) => {
//             if (err) {
//               throw err;
//             }
//             if (response.value) {
//               res.status(200).send("you added a comment");
//             } else {
//               res.sendStatus(404);
//             }
//             connection.close();
//           }
//         );
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// const deleteComment = async (req, res) => {
//   try {
//     const post = await findPost(req.params.id);
//     MongoClient.connect(mongoURL, (error, connection) => {
//       if (error) {
//         throw error;
//       }
//       const socialMediaDB = connection.db(DATA_BASE);
//       socialMediaDB
//         .collection("posts")
//         .findOneAndUpdate(
//           { _id: ObjectId(post._id) },
//           { $pull: { comments: req.body } },
//           (err, response) => {
//             if (err) {
//               throw err;
//             }
//             if (response.value) {
//               res.status(200).send("you deleted the comment");
//             } else {
//               res.sendStatus(404);
//             }
//             connection.close();
//           }
//         );
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const addNewCommnet = async (req, res) => {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const socialMediaDB = connection.db(DATA_BASE);
    const obj = req.body;
    obj.createDate = new Date();
    socialMediaDB.collection("comments").insertOne(obj, (err, response) => {
      if (err) {
        throw err;
      }
      res.status(201).send(response);
      connection.close();
    });
  });
};

const getAllComments = async (req, res) => {

  const client = await MongoClient.connect(mongoURL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const socialMediaDB = client.db(DATA_BASE);

    const collection = socialMediaDB.collection("comments");

    const query = { postId: req.params.postId };

    const result = await collection.find(query).toArray();

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getComment = async (req, res) => {
  const client = await MongoClient.connect(mongoURL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const socialMediaDB = client.db(DATA_BASE);

    const collection = socialMediaDB.collection("comments");

    const query = { _id: ObjectId(req.params.commentId) };

    const result = await collection.findOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

async function findPost(id) {
  const client = await MongoClient.connect(mongoURL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const socialMediaDB = client.db(DATA_BASE);

    const collection = socialMediaDB.collection("posts");

    const query = { _id: ObjectId(id) };

    const res = await collection.findOne(query);

    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

async function getAllPostsOfUser(id) {
  const client = await MongoClient.connect(mongoURL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const socialMediaDB = client.db(DATA_BASE);

    const collection = socialMediaDB.collection("posts");

    const query = { userId: id };

    const res = await collection.find(query).toArray();

    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

module.exports = {
  getPost,
  addPost,
  editPost,
  deletePost,
  likePost,
  getPosts,
  getUserPosts,
  // addComment,
  // deleteComment,
  addNewCommnet,
  getAllComments,
  getComment
};
