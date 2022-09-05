import React, { useEffect, useState } from 'react';
import SingleComment from '../SingleComment/Comment';

import styles from './styles.module.scss';

const ReplyComment = ({
	updateComment,
	postId,
	commentList,
	parentCommentId,
}) => {
	const [childCommentNumber, setChildCommentNumber] = useState(0);
	const [OpenReplyComments, setOpenReplyComments] = useState(false);
	useEffect(() => {
		let commentNumber = 0;
		commentList.map((comment) => {
			if (comment.responseTo === parentCommentId) {
				commentNumber++;
			}
		});
		setChildCommentNumber(commentNumber);
	}, [commentList, parentCommentId]);

	const handleChange = () => {
		setOpenReplyComments(!OpenReplyComments);
	};

	const renderReplyComment = () => {
		return commentList.map((comment, i) => (
			<React.Fragment key={i}>
				{comment.responseTo === parentCommentId && (
					<div className={styles.commentsWrap}>
						<SingleComment
							comment={comment}
							postId={postId}
							updateComment={updateComment}
						/>
						<ReplyComment
							commentList={commentList}
							postId={postId}
							updateComment={updateComment}
							parentComponentId={comment._id}
						/>
					</div>
				)}
			</React.Fragment>
		));
	};

	return (
		<div>
			{childCommentNumber > 0 && (
				<p className={styles.moreBTn} onClick={handleChange}>
					View {childCommentNumber} more comment(s)
				</p>
			)}
			{OpenReplyComments && renderReplyComment(parentCommentId)}
		</div>
	);
};

export default ReplyComment;
