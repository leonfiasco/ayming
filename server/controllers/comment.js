const mongoose = require('mongoose');

const Comment = require('../models/comment');

exports.comments_add_comment = async (req, res) => {
	const comment = new Comment({
		postId: req.body.postId,
		commentAuthor: req.body.commentAuthor,
		content: req.body.content,
		_id: new mongoose.Types.ObjectId(),
	});
	try {
		const result = await comment.save();
		res.status(201).json({
			message: 'Created comment successfully',
			createdComment: {
				postId: result.postId,
				commentAuthor: result.commentAuthor,
				content: result.content,
				_id: result._id,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: err,
		});
	}
};

exports.comments_get_all = async (req, res) => {
	await Comment.find({ postId: req.params.postId })
		.populate('commentAuthor')
		.exec((err, comment) => {
			if (err) return res.status(400).send(err);
			res.status(200).json({ success: true, comment });
		});
};

exports.comments_save_comment = async (req, res) => {
	const comment = new Comment(req.body);
	await comment.save((err, comment) => {
		Comment.find({ _id: comment._id })
			.populate('commentAuthor')
			.exec((err, result) => {
				if (err) return res.json({ success: false, err });
				return res.status(200).json({ success: true, result });
			});
	});
};
