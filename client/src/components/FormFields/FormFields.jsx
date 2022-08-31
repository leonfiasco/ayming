import { Link } from 'react-router-dom';

const FormFields = ({ setTitle, setDescription, setAuthor }) => {
	return (
		<>
			<div className={'form-group'}>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					name='title'
					id='title'
					className='form-control'
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<label htmlFor='description'>Description</label>
				<textarea
					type='text'
					name='description'
					id='description'
					className='form-control'
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				<label htmlFor='author'>Author</label>
				<input
					type='text'
					name='author'
					id='author'
					className='form-control'
					onChange={(e) => setAuthor(e.target.value)}
					required
				/>
			</div>
			<Link to={'/'} className='btn btn-secondary'>
				Cancel
			</Link>
			<button className='btn btn-primary' type='submit'>
				Save
			</button>
		</>
	);
};

export default FormFields;
