import { useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import styles from './styles.module.scss';
const { TextArea } = Input;

const SingleComment = ({ comment, postId, updateComment }) => {
	const [commentValue, setCommentValue] = useState('');
	const [openReply, setOpenReply] = useState(false);

	const handleChange = (e) => {
		setCommentValue(e.currentTarget.value);
	};

	const handleClick = () => {
		setOpenReply(!openReply);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const replyComment = {
			commentAuthor: comment.commentAuthor,
			postId: postId,
			responseTo: comment._id,
			content: commentValue,
		};

		const res = await axios.post('/comments/saveComment', replyComment);

		if (res.status === 200) {
			setCommentValue('');
			setOpenReply('');
			updateComment(res.data.result);
		}
	};

	return (
		<div className={styles.singleComment}>
			<div className={styles.commentWrap}>
				<div>
					<p>{comment.commentAuthor}</p>
					<article>
						<p>{comment.content}</p>
					</article>
				</div>
				<span onClick={handleClick} key='comment-basic-reply-to'>
					Reply to
				</span>
			</div>
			{openReply && (
				<form className={styles.replyForm} onSubmit={onSubmit}>
					<TextArea
						className={styles.textarea}
						onChange={handleChange}
						value={commentValue}
						placeholder='write some comments'
					/>
					<br />
					<button className='btn btn-info'>Submit</button>
				</form>
			)}
		</div>
	);
};

export default SingleComment;
