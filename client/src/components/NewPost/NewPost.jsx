import { useState } from 'react';
import FormFields from '../FormFields/FormFields';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [author, setAuthor] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newPost = {
			title,
			description,
			author,
		};

		const res = await axios.post('/posts/add-post', newPost);
		console.log(res);
		if (res.status === 200) {
			navigate('/');
		} else {
		}
	};
	return (
		<div className={'container'}>
			<h1 className={'mb-4'}>New Post</h1>
			<form method='POST' onSubmit={handleSubmit}>
				<FormFields
					setTitle={setTitle}
					setDescription={setDescription}
					setAuthor={setAuthor}
				/>
			</form>
		</div>
	);
};

export default NewPost;
