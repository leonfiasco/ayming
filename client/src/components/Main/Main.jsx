import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import styles from './styles.module.scss';

const Main = () => {
	const [blogs, setBlogs] = useState();

	const fetchBlogsData = async () => {
		const res = await axios.get('/posts/');
		setBlogs(res.data);
	};

	useEffect(() => {
		fetchBlogsData().catch((err) => {
			console.log(err);
		});
	}, []);

	const renderBlogs = () => {
		return (
			blogs &&
			blogs.map((post) => {
				const { _id, title, author, createdAt } = post;
				const formattedDate = createdAt && moment(createdAt).format('DD/MM/YYYY');
				return (
					<Link to={`posts/${_id}`} className='link' key={_id}>
						<div className={'card mb-4'} id={styles.card}>
							<div className={'card-body'}>
								<h4 className={'card-title'}>{title}</h4>
								<p className={'card-subtitle text-muted mb-2'}>{formattedDate}</p>
								<p className={'card-text mb-2'}>Written by: {author}</p>
							</div>
						</div>
					</Link>
				);
			})
		);
	};

	return (
		<main className={'container'}>
			<div className={styles.pageTitleContainer}>
				<h1 className={'mb-4'}>Blog Posts</h1>
				<Link to={'/posts/add-post'}>
					<a className={'btn btn-success mb-5'}>New Post</a>
				</Link>
			</div>
			{renderBlogs()}
		</main>
	);
};

export default Main;
