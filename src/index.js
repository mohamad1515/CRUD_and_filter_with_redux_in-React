import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "rsuite/dist/rsuite.min.css";


import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			{/* <CustomProvider theme="dark"> */}
			<App />
			{/* </CustomProvider> */}
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
