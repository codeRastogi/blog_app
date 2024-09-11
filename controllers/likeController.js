const Post = require('../models/postModel');
const Like = require('../models/likeModel');


exports.likePost = async(req, res) => {
    try {
        const {post, user} = req.body;
        const like = new Like({
            post, user
        });

       const savedLike = await like.save();
        
       const updatedPost = await Post.findByIdAndUpdate(post, {$push : {likes: savedLike._id}}, {new: true})
        .populate("likes")
        .exec();
        res.status(200).json({
            post: updatedPost,
            messege: "success",
        });
    } catch (error) {
        console.error(error);
        res.status(500)
    }
}

exports.removeLike = async(req, res) => {

    try {
        const {like_id} = req.params;
        const like = await Like.findById(like_id);

        if (!like) {
            // Return a 404 error if like is not found
            return res.status(404).json({
              message: "like not found",
            });
          }
          
        const {post} = like;
        await Like.findByIdAndDelete(like_id);

        const updatedPost = await Post.findByIdAndUpdate(post, {$pull : {likes : like_id}}, {new : true}).exec();

        res.status(200).json({
            post: updatedPost,
            message : "Like removed successfully"
        })
        

    } catch (error) {

        res.status(500).json({
         error :error.message,
         message: "Error while removing like"
        })
        
    }
    
}