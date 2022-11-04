import { config } from 'dotenv';
config();

//  ------------------------- Connection with DB
import connectDB from './config/DB';
connectDB();

//  ------------------------- Setup Logger
import Logger from './utils/Logger';
global.logger = Logger;
global.__basedir = __dirname.slice(0, __dirname.lastIndexOf('/'));

//  ------------------------- Imports

import express, { Request } from 'express';
import cookieParser from 'cookie-parser';
import moment from 'moment';

const app = express();

//  ------------------------- Modals

import Question from './model/Question';
import Admin from './model/Admin';
import Collection from './model/Collection';
import Program from './model/Program';
import Test from './model/Test';
import Result from './model/Result';
import User from './model/User';
import Skill from './model/Skill';

// ----------------------------------------------------CORS

import cors from 'cors';

const allowlist = [
	'https://educaretech.org',
	'https://www.educaretech.org',
	'http://localhost:3000',
	'http://localhost:3001',
];

const corsOptionsDelegate = (req: Request, callback: any): void => {
	const corsOptions = { origin: false, credentials: false };

	const isDomainAllowed = allowlist.includes(req.header('Origin') || '');

	if (isDomainAllowed) {
		// Enable CORS for this request
		corsOptions.origin = true;
		corsOptions.credentials = true;
	}

	callback(null, corsOptions);
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptionsDelegate));
app.use(cookieParser());
app.use(express.static(__basedir + '/static'));

app.get('/api', async (req, res) => {
	await Question.find();
	await Admin.find();
	await Collection.find();
	await Test.find();
	await Result.find();
	await User.find();
	await Skill.find();
	await Program.find();
	res.status(200).json({
		success: true,
		message: 'API Working',
	});
});

//  ------------------------- Routes
import AuthRoute from './routes/user/Auth';
import SkillRoute from './routes/user/Skill';
import ProgramRoute from './routes/user/Program';
import CollectionRoute from './routes/user/Collection';
import TestRoute from './routes/user/Test';
// import ModelRoute from './routes/Models';

app.use('/auth', AuthRoute);
app.use('/skills', SkillRoute);
app.use('/programs', ProgramRoute);
app.use('/collections', CollectionRoute);
app.use('/tests', TestRoute);

app.get('/image/:imageID', async (req, res) => {
	if (!req.params.imageID) {
		return res.status(404);
	}
	try {
		res.sendFile(__basedir + '/static/uploads/' + req.params.imageID);
	} catch (e) {
		return res.status(404);
	}
});

app.get('/file/:fileID', async (req, res) => {
	if (!req.params.fileID) {
		return res.status(404).json("File doesn't exist");
	}

	try {
		res.sendFile(__basedir + '/static/uploads/' + req.params.fileID);
	} catch (e) {
		return res.status(404);
	}
});

const PORT = process.env.PORT!;
const server = app.listen(PORT, () =>
	console.log(`Server running at ${getTime()} on port ${PORT}`)
);

process.on('unhandledRejection', (err: Error) => {
	console.log(err);

	console.log(`Logged Error at ${getTime()}: ${err.message}`);
	server.close(() => process.exit(1));
});

const getTime = () => {
	return moment().format('YYYY-MM-DD HH:mm:ss');
};
