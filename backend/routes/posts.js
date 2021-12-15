var express = require('express');
var router = express.Router()
const { isAuth } = require('../controllers/auth')
const { getAllWorkProviderPosts, getAllWorkRequestPosts, getPostById, addNewPost, editPostById, deletePostById, addNewComment, editcommentById, deletecommentById } = require('../controllers/post')

router.use('/', isAuth);
router.get('/providers/:city/:state/:page', getAllWorkProviderPosts);
router.get('/requests/:city/:state/:page', getAllWorkRequestPosts);
router.post('/:id', getPostById);
router.post('/', addNewPost);
router.put('/:id', editPostById);
router.delete('/:id', deletePostById);
router.post('/:id/comments', addNewComment);
router.put('/:id/comments/:comment_id', editcommentById);
router.delete('/:id/comments/:comment_id', deletecommentById);

module.exports = router;