import React, { useState } from 'react';
import axios from 'axios';
import SingleComment from '../SingleComment/Comment';

import styles from './styles.module.scss';
import ReplyComment from '../ReplyComment/ReplyComment';

const Comment = ({ postId, updateComment, commentList }) => {
	const [comment, setComment] = useState('');
	const [user, setUser] = useState('');

	const handleChange = (e) => {
		setComment(e.currentTarget.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const commentData = {
			postId,
			commentAuthor: user,
			content: comment,
		};

		const res = await axios.post('/comments/add-comment', commentData);
		if (res.status === 201) {
			updateComment(res.data.createdComment);
		}
	};

	const renderAddCommentForm = () => {
		return (
			<form action='' onSubmit={handleSubmit} className={styles.form}>
				<div>
					<label htmlFor='user' className={styles.label}>
						User
					</label>
					<input
						type='text'
						name='user'
						className={styles.input}
						onChange={(e) => setUser(e.target.value)}
						placeholder='add username'
					/>
				</div>
				<div>
					<textarea
						className={styles.textArea}
						onChange={handleChange}
						value={comment}
						placeholder='write some comments'
					/>

					<button type='submit' className='btn btn-success' onClick={handleSubmit}>
						submit
					</button>
				</div>
			</form>
		);
	};

	const renderComments = () => {
		return (
			commentList &&
			commentList.map(
				(comment, index) =>
					!comment.responseTo && (
						<React.Fragment>
							<SingleComment
								comment={comment}
								postId={postId}
								updateComment={updateComment}
							/>
							<ReplyComment
								commentList={commentList}
								postId={postId}
								parentCommentId={comment._id}
								updateComment={updateComment}
							/>
						</React.Fragment>
					)
			)
		);
	};

	return (
		<div>
			<p className={styles.comments}>comments</p>
			<hr />
			{renderAddCommentForm()}
			<p className={styles.comments}>
				{!commentList.length ? null : `commets: ${commentList.length}`}
			</p>
			{renderComments()}
		</div>
	);
};

export default Comment;
