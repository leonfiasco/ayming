import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import PostShow from './components/PostShow/PostShow';
import NewPost from './components/NewPost/NewPost';

function App() {
	return (
		<BrowserRouter>
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
			</Routes>
		</BrowserRouter>
	);
}

export default App;
