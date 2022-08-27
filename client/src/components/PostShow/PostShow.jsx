import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import moment from 'moment';

import styles from './styles.module.scss';

const PostShow = () => {
	const [post, setPost] = useState({});
	const location = useLocation();
	const path = location.pathname.split('/')[2];

	const getSinglePost = async () => {
		const res = await axios.get(`/posts/${path}`);
		setPost(res.data);
	};

	useEffect(() => {
		getSinglePost();
	}, [path]);

	const formattedDate =
		post.createdAt && moment(post.createdAt).format('DD/MM/YYYY');

	return (
		<div className='container' id={styles.container}>
			<h1 className='mb-1'>{post.title && post.title}</h1>
			<p className={'text-muted mb-2'}>{formattedDate}</p>
			<a href='/' className='btn btn-secondary'>
				All Articles
			</a>
			<a href='/' className='btn btn-info'>
				Edit
			</a>
			<article className='font-monospace'>
				<p>{post.description && post.description}</p>
			</article>
			<p className='font-monospace'>{`Author: ${post.author}`}</p>
		</div>
	);
};

export default PostShow;
