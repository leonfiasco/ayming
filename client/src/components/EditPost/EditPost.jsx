import { useState } from 'react';
import { useLocation } from 'react-router';
import FormFields from '../FormFields/FormFields';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditPost = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [author, setAuthor] = useState('');

	const location = useLocation();
	const id = location.pathname.split('/')[3];

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const editPost = {
			title,
			description,
			author,
		};

		const res = await axios.patch(`/posts/edit/${id}`, editPost);

		if (res.status === 200) {
			navigate('/');
		}
	};
	return (
		<div className={'container'}>
			<h1 className={'mb-4'}>Edit Post</h1>
			<form onSubmit={handleSubmit}>
				<FormFields
					setTitle={setTitle}
					setDescription={setDescription}
					setAuthor={setAuthor}
				/>
			</form>
		</div>
	);
};

export default EditPost;
