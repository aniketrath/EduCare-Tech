import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import RequireAuth from './routes/RequireAuth';
import Auth from './screens/landing/Auth';
import Home from './screens/home/Home';
import Programs from './screens/programs/Programs';
import Skills from './screens/skills/Skills';
import Collections from './screens/collections/Collections';
import Program from './screens/programs/Program';
import Skill from './screens/skills/Skill';
import Tests from './screens/tests/Tests';
import Landing from './screens/landing/Landing';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './utils/Consts';
import CreateProgram from './screens/programs/CreateProgram';
import AddProgramResources from './screens/programs/AddResources';
import CreateSkill from './screens/skills/CreateSkill';
import AddSkillResources from './screens/skills/AddResources';
import CreateCollection from './screens/collections/CreateCollection';
import NewTest from './screens/tests/NewTest';
import TestDetails from './screens/tests/TestDetails';
import TestResponses from './screens/tests/TestResponses';
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
								<Route path='programs/create' element={<CreateProgram />} />
								<Route path='programs/add-resources/:id' element={<AddProgramResources />} />
								<Route path='programs/:id' element={<Program />} />
								<Route path='skills' element={<Skills />} />
								<Route path='skills/create' element={<CreateSkill />} />
								<Route path='skills/add-resources/:id' element={<AddSkillResources />} />
								<Route path='skills/:id' element={<Skill />} />
								<Route path='collections' element={<Collections />} />
								<Route path='collections/create' element={<CreateCollection />} />
								<Route path='tests' element={<Tests />} />
								<Route path='tests/new' element={<NewTest />} />
								<Route path='tests/:id/details' element={<TestDetails />} />
								<Route path='tests/:id/responses' element={<TestResponses />} />
							</Route>
							<Route path='/auth' element={<Auth />} />
							<Route path='/' element={<Navigate to='/auth' />} />
						</Routes>
					</BrowserRouter>
					<AlertBar />
				</div>
			</Provider>
		</GoogleOAuthProvider>
	);
}

export default App;
