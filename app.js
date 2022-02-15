const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// const multer = require("multer");

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const followRouter = require('./routes/follow');
const postsRouter = require('./routes/posts');
const commentsRouter = require("./routes/comments");
const uploadRouter = require("./routes/upload");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Added to serve client static files
app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use("/comments", commentsRouter);
app.use('/follow', followRouter);
app.use('/upload', uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.sendStatus(200);
//   } catch (error) {
//     console.error(error);
//   }
// });

// const { register, addDetails } = require("./utils/newUser");
// const {
//   findUser,
//   getUserById,
//   getAllUsers,
//   editUser,
// } = require("./utils/users");
// const { addToFollowings, removeFromFollowings } = require("./utils/follow");
// const {
//   getPost,
//   addPost,
//   editPost,
//   deletePost,
//   likePost,
//   getPosts,
//   getUserPosts,
//   addComment,
//   deleteComment,
//   addNewCommnet,
//   getAllComments,
//   getComment,
// } = require("./utils/posts");
// const { getFriends } = require("./utils/users");
// const {
//   addConversation,
//   getUserConversations,
//   addMessage,
//   getAllMessages,
//   getConversation,
// } = require("./utils/chat");

//----------------------------- new user -----------------------------------

// app.post("/register", (req, res) => {
//   register(req, res);
// });

// app.patch("/details", (req, res) => {
//   addDetails(req, res);
// });

//----------------------------- users -----------------------------------

// app.get("/users/newuser/:email", (req, res) => {
//   findUser(req, res);
// });

// app.get("/users", (req, res) => {
//   getAllUsers(req, res);
// });

// app.get("/users/:id", (req, res) => {
//   getUserById(req, res);
// });

// app.patch("/users/:id/edit", (req, res) => {
//   editUser(req, res);
// });

// app.get("/users/friends/:id", (req, res) => {
//   getFriends(req, res);
// });

//----------------------- follow -----------------------------------------

// app.patch("/:id/follow", (req, res) => {
//   addToFollowings(req, res);
// });

// app.patch("/:id/unfollow", (req, res) => {
//   removeFromFollowings(req, res);
// });

//------------------------- posts ----------------------------------------

// app.get("/posts/:id", (req, res) => {
//   getPost(req, res);
// });

// app.get("/posts/profile/:id", (req, res) => {
//   getUserPosts(req, res);
// });

// app.post("/posts/create", (req, res) => {
//   addPost(req, res);
// });

// app.get("/posts/timeline/:id", (req, res) => {
//   getPosts(req, res);
// });

// app.patch("/posts/:id", (req, res) => {
//   editPost(req, res);
// });

// app.delete("/posts/:id", (req, res) => {
//   deletePost(req, res);
// });

// app.patch("/posts/:id/like", (req, res) => {
//   likePost(req, res);
// });

// ---------------------- comments ------------------------

// app.patch("/comments/:id/comment", (req, res) => {
//   addComment(req, res);
// });

// app.delete("/comments/:id/comment", (req, res) => {
//   deleteComment(req, res);
// });

// app.post("/comments/comment", (req, res) => {
//   addNewCommnet(req, res);
// });

// app.get("/comments/comment/:postId", (req, res) => {
//   getAllComments(req, res);
// });

// app.get("/comments/userComment/:commentId", (req, res) => {
//   getComment(req, res);
// })

// ----------------------- chat ---------------------------

// app.post("/conversations", (req, res) => {
//   addConversation(req, res);
// });

// app.get("/conversations/:id", (req, res) => {
//   getUserConversations(req, res);
// });

// app.get("/conversation/:firstId/:secondId", (req, res) => {
//   getConversation(req, res);
// });

// app.post("/messages", (req, res) => {
//   addMessage(req, res);
// });

// app.get("/messages/:conversationId", (req, res) => {
//   getAllMessages(req, res);
// });

// app.use(express.static(path.join(__dirname, "client", "build")));
// app.get("*", (req, resp) => {
//   resp.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });


module.exports = app;
