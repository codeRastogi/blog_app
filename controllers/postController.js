const Post = require('../models/postModel')
const Comment = require('../models/commentModel');
const Like = require('../models/likeModel');



exports.createPost = async(req, res) => {
    try {
        const {title, body} = req.body;
        const post = new Post({title: title, body: body});
        const savedPost = await post.save();

        res.status(200).json({
            Message: "success",
            post : savedPost,
        })
    } catch (error) {

        console.error(error);

    }
}

exports.getPosts = async(req, res) => {
    try {
        const posts = await Post.find().populate("comments").populate("likes").exec();

        res.status(200).json({
            messege : "successfully fetched posts",
            posts : posts
        })
    } catch (error) {
        console.error(error)
    }
}

exports.getPostById = async(req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id).populate("comments").populate("likes").exec();
        res.status(200).json({
            messege : "Post successfully fetched",
            posts : post
        })
    } catch (error) {
        console.error(error);
    }
}

exports.deletePost = async(req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        const {comments, likes} = post;
        for (const commentId of comments) {
            await Comment.findByIdAndDelete(commentId);  // Wait for each comment to be deleted
        }
        for (const likeId of likes) {
            await Like.findByIdAndDelete(likeId);  // Wait for each comment to be deleted
        }
        await Post.findByIdAndDelete(id);

        res.status(200).json({
            message: "Post deleted successfully"
        })

    }catch (error) {

        console.error(error);
        

    }
}