import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import { GOOGLE_CLIENT_ID } from './utils/Consts';
import Landing from './screens/landing/Landing';
import Auth from './screens/landing/Auth';
import RequireAuth from './routes/RequireAuth';
import Home from './screens/home/Home';
import Programs from './screens/programs/Programs';
import Skills from './screens/skills/Skills';
import Collections from './screens/collections/Collections';
import Program from './screens/programs/Program';
import Skill from './screens/skills/Skill';
import Tests from './screens/tests/Tests';
import Terms from './screens/tests/Terms';
import TestScreen from './screens/tests/TestScreen';
import AlertBar from './components/module/AlertBar';

function App() {
	if (window.location.host.indexOf('localhost') < 0) {
		console.log = function () {};
	}

	return (
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<Provider store={store}>
				<div className='App'>
					<BrowserRouter>
						<Routes>
							<Route path='home' element={<RequireAuth component={Home} />}>
								<Route path='programs' element={<Programs />} />
								<Route path='programs/:id' element={<Program />} />

								<Route path='skills' element={<Skills />} />
								<Route path='skills/:id' element={<Skill />} />

								<Route path='collections' element={<Collections />} />

								<Route path='tests' element={<Tests />} />
								<Route path='tests/terms-conditions/:id' element={<Terms />} />
							</Route>
							<Route path='test/:id' element={<RequireAuth component={TestScreen} />} />
							<Route path='/auth' element={<Auth />} />
							<Route path='/' element={<Landing />} />
						</Routes>
					</BrowserRouter>
					<AlertBar />
				</div>
			</Provider>
		</GoogleOAuthProvider>
	);
}

export default App;
