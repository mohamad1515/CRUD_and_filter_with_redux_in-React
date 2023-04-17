import './App.css';
import Posts from './components/Posts';
import Sidebar from './components/Sidebar';

function App() {
	return (
		<div className="main">
			<Sidebar />
			<Posts />
		</div>
	);
}

export default App;
