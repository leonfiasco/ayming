const mongoose = require('mongoose');
const Blog = require('../models/blog');

exports.blogs_get_all = (req, res) => {
	Blog.find()
		.sort({
			createdAt: 'desc',
		})
		.select('_id title description author createdAt')
		.exec()
		.then((blog) => {
			res.send(blog);
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

exports.blogs_get_single = async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	if (blog === null) res.redirect('/');
	res.status(200).json({
		_id: blog._id,
		createdAt: blog.createdAt,
		title: blog.title,
		description: blog.description,
		author: blog.author,
	});
};

exports.blogs_create_blog = async (req, res) => {
	const blog = new Blog({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
	});
	try {
		const result = await blog.save();

		console.log(result);
		res.status(200).json({
			message: 'Created blog successfully',
			createdBlog: {
				_id: result._id,
				title: result.title,
				description: result.description,
				author: result.author,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: err,
		});
	}
};
