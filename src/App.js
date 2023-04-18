import { CustomProvider } from 'rsuite';
import './App.css';
import Posts from './components/Posts';
import Sidebar from './components/Sidebar';
import { useSelector } from 'react-redux';

function App() {
	const theme = useSelector((state) => state.PostReducers.theme);

	return (
		<CustomProvider theme={theme}>
			<div className="main">
				<Sidebar />
				<Posts />
			</div>
		</CustomProvider>
	);
}

export default App;
