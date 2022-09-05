const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
	commentAuthor: { type: String },
	responseTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	content: { type: String },
});

module.exports = mongoose.model('Comment', commentSchema);
