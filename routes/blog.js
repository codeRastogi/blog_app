const express = require('express');

const route = express.Router();


//import controllers
const {createComment, deleteComment} = require('../controllers/commentController');
const {likePost, removeLike} = require('../controllers/likeController');
const {createPost, getPosts, getPostById, deletePost} = require('../controllers/postController');

//create mapping
route.post('/create/comment', createComment);
route.delete('/delete/comment/:comment_id', deleteComment);

route.post('/like/post', likePost);
route.delete('/removelike/from/post/:like_id', removeLike);


route.post('/create/post', createPost);
route.get('/get/posts', getPosts);
route.get('/get/post/:id', getPostById);
route.delete('/delete/post/:id', deletePost);

module.exports = route;



//export