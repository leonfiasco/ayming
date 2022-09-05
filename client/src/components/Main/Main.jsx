import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import styles from './styles.module.scss';

const Main = () => {
	const [blogs, setBlogs] = useState();

	const fetchBlogsData = async () => {
		const res = await axios.get('/posts/');
		console.log('===>', res.data);
		setBlogs(res.data);
	};

	useEffect(() => {
		fetchBlogsData().catch((err) => {
			console.log(err);
		});
	}, []);

	const renderBlogPosts = () => {
		return (
			blogs &&
			blogs.map((post) => {
				const { _id, title, author, createdAt } = post;
				const formattedDate = createdAt && moment(createdAt).format('DD/MM/YYYY');
				return (
					<div
						key={_id}
						className={'card mb-4'}
						id={styles.card}
						data-testid='resolved'
					>
						<div className={'card-body'}>
							<h4 className={'card-title'}>{title}</h4>
							<p className={'card-subtitle text-muted mb-2'}>{formattedDate}</p>
							<p className={'card-text mb-2'} id={styles.author}>
								<span>Written by:</span> {author}
							</p>
							<div className={styles.btnWrap}>
								<Link to={`posts/${_id}`} className='btn btn-primary'>
									Read More
								</Link>
								<Link to={`posts/edit/${_id}`} className='btn btn-info'>
									Edit
								</Link>
							</div>
						</div>
					</div>
				);
			})
		);
	};

	return (
		<main className={'container'}>
			<div className={styles.pageTitleContainer}>
				<h1 className={'mb-4'}>Blog Posts</h1>
				<Link to={'/posts/add-post'} className={'btn btn-success mb-5'}>
					New Post
				</Link>
			</div>
			{renderBlogPosts()}
		</main>
	);
};

export default Main;
