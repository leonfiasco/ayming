const express = require('express');
const router = express.Router();

const BlogController = require('../controllers/blog');

router.get('/', BlogController.blogs_get_all);

router.get('/:id', BlogController.blogs_get_single);

router.patch('/edit/:id', BlogController.blogs_edit_blog);

router.post('/add-post', BlogController.blogs_create_blog);

router.delete('/:id', BlogController.blog_delete);

module.exports = router;
