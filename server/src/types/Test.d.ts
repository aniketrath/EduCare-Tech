import mongoose from 'mongoose';
import IQuestion from './Question';

interface ITest extends mongoose.Document {
	title: string;
	startsAt: Date;
	endsAt: Date;
	time: number;
	questions: IQuestion[];
}

export default ITest;
