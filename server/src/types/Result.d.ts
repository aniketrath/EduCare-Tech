import mongoose from 'mongoose';
import IQuestion from './Question';
import ITest from './Test';
import IUser from './User';

type Answer = IQuestion['answer'];
interface IResult extends mongoose.Document {
	user: IUser;
	score: number;
	test: ITest;
	startedAt: string;
	submitted: boolean;
}

export default IResult;
