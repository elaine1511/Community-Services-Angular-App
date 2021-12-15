const Post = require("../models/posts");
const User = require("../models/users");
const ObjectId = require('mongodb').ObjectId;

const getAllWorkProviderPosts = async (req, res) => {
    try {
        const limit = 25;
        const page = parseInt(req.params.page);
        const skip = (page - 1) * limit;
        const lastPage = page * limit;
        const results = {};
        if (lastPage < await Post.countDocument().exec())
            results.next = {
                page: page + 1,
                limit: limit
            }
        if (skip > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        results.posts = await Post.find({
            serviceType: 'Work Providers',
            createAt: {
                city: req.params.city,
                state: req.params.state
            }
        })
            .sort({ createTime: -1 }).skip(skip).limit(limit).exec();

        res.json({ status: 'success', results })
    } catch (error) {
        res.status(500).json({ message: e.message })
    }
}

const getAllWorkRequestPosts = async (req, res) => {
    try {
        const limit = 25;
        const page = parseInt(req.params.page);
        const skip = (page - 1) * limit;
        const lastPage = page * limit;
        const results = {};
        if (lastPage < await Post.countDocument().exec())
            results.next = {
                page: page + 1,
                limit: limit
            }
        if (skip > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        results.posts = await Post.find({
            serviceType: 'Work Requests',
            createAt: {
                city: req.params.city,
                state: req.params.state
            }
        })
            .sort({ createTime: -1 }).skip(skip).limit(limit).exec();

        res.json({ status: 'success', results })
    } catch (error) {
        res.status(500).json({ message: e.message })
    }
}

const getPostById = async (req, res) => {
    try {
        const response = await Post.findOne({ _id: ObjectId(req.params.id) })
        res.json({ status: 'success', response })
    } catch (error) {
        res.status(500).json({ message: e.message })
    }
}

const addNewPost = async (req, res) => {
    const body = req.body;
    const newPost = new Post({
        _id: new ObjectId(),
        serviceType: body.serviceType,
        createrId: req._id,
        createTime: new Date(),
        createrName: body.createrName,
        city: body.city,
        state: body.state,
        serviceContent: body.serviceContent,
        offerPrice: body.offerPrice,
        comments: [],
        requestTime: body.requestTime,
        status: body.status

    });
    try {
        const response = await newPost.save();
        console.log(response)
        res.status(201).json({ status: 'success', response });
    } catch (error) {
        res.status(500).json({ message: e.message })
    }
}

const editPostById = async (req, res) => {
    const body = req.body;
    const filter = { _id: ObjectId(req.params.id), createrId: req._id };
    const update = {

        city: body.city,
        state: body.state
        ,
        serviceContent: body.serviceContent,
    };
    try {
        const response = await Post.findOneAndUpdate(filter, update, { new: true });
        res.json({ status: 'success', response })
    } catch (error) {
        res.status(500).json({ message: e.message })
    }
}
const deletePostById = async (req, res) => {
    const filter = { _id: ObjectId(req.params.id), createrId: req._id };
    try {
        const response = await User.findOneAndDelete(filter);
        res.json({ status: 'success', response })
    } catch (error) {
        res.status(500).json({ message: e.message })
    }
}
const addNewComment = async (req, res) => {
    const body = req.body;
    const newComment = {
        _id: new ObjectId(),
        createTime: new Date(),
        createrId: req._id,
        createrName: body.createrName,
        comment: body.comment,
    };
    try {
        const response = Post.updateOne({ _id: ObjectId(req.params.id) }, {
            $push: { comments: newComment }
        });
        res.status(201).json({ status: 'success', response });
    } catch (error) {
        res.status(500).json({ message: e.message })
    }
}
const editcommentById = async (req, res) => {
    const filter = {
        "comments._id": ObjectId(req.params.comment_id),
        "comments.createrId": req._id
    }
    const update = { "comments.comment": req.body.comment };
    try {
        const response = await Post.findOneAndUpdate({ filter }, update, { new: true });
        res.json({ status: 'success', response })
    } catch (error) {
        res.status(500).json({ message: e.message })
    }
}
const deletecommentById = async (req, res) => {
    const filter = {
        "comments._id": ObjectId(req.params.comment_id),
        "comments.createrId": req._id
    }
    try {
        const response = await Post.findOneAndUpdate({ filter }, { $pull: { comments: { _id: ObjectId(req.params.comment_id) } } }, { new: true });
        res.json({ status: 'success', response })
    } catch (error) {
        res.status(500).json({ message: e.message })
    }
}


module.exports = { getAllWorkProviderPosts, getAllWorkRequestPosts, getPostById, addNewPost, editPostById, deletePostById, addNewComment, editcommentById, deletecommentById };