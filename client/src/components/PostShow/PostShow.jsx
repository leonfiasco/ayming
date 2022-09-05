import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Comments from '../Comments/Comments';
import axios from 'axios';
import moment from 'moment';

import styles from './styles.module.scss';

const PostShow = () => {
	const [post, setPost] = useState({});
	const [commentList, setCommentList] = useState([]);

	const location = useLocation();
	const id = location.pathname.split('/')[2];
	const navigate = useNavigate();

	const getSinglePost = async () => {
		const res = await axios.get(`/posts/${id}`);
		setPost(res.data);
		if (res.status === 500) {
			navigate('/');
		}
	};

	const getComments = async () => {
		const res = await axios.get('/comments/getComments/' + id);

		if (res.data.success) {
			setCommentList(res.data.comment);
		}
	};

	const deleteBlog = async (id) => {
		const res = await axios.delete(`/posts/${id}`);
		if (res.status === 200) {
			navigate('/');
		}
	};

	useEffect(() => {
		getSinglePost();
		getComments();
	}, [id]);

	const updateComment = (newComment) => {
		setCommentList(commentList.concat(newComment));
	};

	const formattedDate =
		post.createdAt && moment(post.createdAt).format('DD/MM/YYYY');

	return (
		<div className='container' id={styles.container}>
			<h1 className='mb-1'>{post.title && post.title}</h1>
			<p className={'text-muted mb-2'}>{formattedDate}</p>
			<div className={styles.btnWrap}>
				<Link to='/' className='btn btn-secondary'>
					All Posts
				</Link>
				<a href={`/posts/edit/${id}`} className='btn btn-info'>
					Edit
				</a>
				<button className='btn btn-danger' onClick={() => deleteBlog(id)}>
					Delete
				</button>
			</div>

			<article className='font-monospace'>
				<p>{post.description && post.description}</p>
			</article>
			<p className='font-monospace'>{`Author: ${post.author}`}</p>
			<br />
			<Comments
				postId={id}
				updateComment={updateComment}
				commentList={commentList}
			/>
		</div>
	);
};

export default PostShow;
