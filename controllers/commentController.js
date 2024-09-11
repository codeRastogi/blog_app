const Post = require('../models/postModel');
const Comment = require('../models/commentModel');


exports.createComment = async(req, res) => {
    try {
        const {post, user, body} = req.body;
        const comment = new Comment({
            post, user, body
        });

       const savedComment = await comment.save();
        
       const updatedPost = await Post.findByIdAndUpdate(post, {$push : {comments: savedComment._id}}, {new: true})
        .populate("comments")
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

exports.deleteComment = async(req, res) => {

    try {
        const {comment_id} = req.params;
        const comment = await Comment.findById(comment_id);

        if (!comment) {
            // Return a 404 error if comment is not found
            return res.status(404).json({
              message: "Comment not found",
            });
          }
          
        const {post} = comment;
        await Comment.findByIdAndDelete(comment_id);

        const updatedPost = await Post.findByIdAndUpdate(post, {$pull : {comments: comment_id}}, {new : true}).exec();

        res.status(200).json({
            post: updatedPost,
            message : "Comment Deleted successfully"
        })
        

    } catch (error) {

        res.status(500).json({
         error :error.message,
         message: "Error while deleting comment"
        })
        
    }
    
}