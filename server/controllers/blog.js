const mongoose = require('mongoose');
const Blog = require('../models/blog');

exports.blogs_get_all = async (req, res) => {
	try {
		const blog = await Blog.find()
			.sort({
				createdAt: 'desc',
			})
			.select('_id title description author createdAt');
		res.status(200);
		res.send(blog);
	} catch (err) {
		res.status(500).json({
			error: err,
		});
		console.log(err);
	}
};

exports.blogs_get_single = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id);
		res.status(200).json({
			_id: blog._id,
			createdAt: blog.createdAt,
			title: blog.title,
			description: blog.description,
			author: blog.author,
		});
	} catch (err) {
		res.status(404).json({
			error: err,
		});
	}
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

		res.status(201).json({
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

exports.blogs_edit_blog = async (req, res) => {
	await Blog.updateOne({ _id: req.params.id }, { $set: req.body });
	res.status(200).json({
		message: 'Updated blog successfully',
	});
};

exports.blog_delete = async (req, res) => {
	const id = req.params.id;
	await Blog.deleteOne({ _id: id });
	res.status(200).json({
		message: `${id} has been deleted`,
	});
};
