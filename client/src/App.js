import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import PostShow from './components/PostShow/PostShow';
import NewPost from './components/NewPost/NewPost';
import EditPost from './components/EditPost/EditPost';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					exact
					path='/'
					element={
						<div className='App'>
							<Main />
						</div>
					}
				/>
				<Route path='posts/:id' element={<PostShow />} />
				<Route path='posts/add-post' element={<NewPost />} />
				<Route path='posts/edit/:id' element={<EditPost />} />
			</Routes>
		</Router>
	);
}

export default App;
