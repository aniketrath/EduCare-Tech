import mongoose from 'mongoose';
import IQuestion from './Question';

interface ITest extends mongoose.Document {
	title: string;
	time: number;
	questions: IQuestion[];
}

export default ITest;
