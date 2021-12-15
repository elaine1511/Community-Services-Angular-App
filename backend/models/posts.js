const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        serviceType: String,
        createrId: String,
        createTime: {
            type: Date, expires: 60 * 60 * 48 * 1000
        },
        createrName: String,
        city: String,
        state: String,
        serviceContent: String,
        offerPrice: String,
        comments: Array,
        requestTime: String,
        status: String
    },
    { collection: "posts" }
);

const Post = new mongoose.model("Post", PostSchema);



module.exports = Post;
