const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/comment');

router.get('/getComments/:postId', CommentController.comments_get_all);

router.post('/add-comment', CommentController.comments_add_comment);

router.post('/saveComment', CommentController.comments_save_comment);

module.exports = router;
