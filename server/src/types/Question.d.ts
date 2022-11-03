import mongoose from 'mongoose';

interface IQuestion extends mongoose.Document {
	question: String;
	option1: String;
	option2: String;
	option3: String;
	option4: String;
	answer: '1' | '2' | '3' | '4';
}

export default IQuestion;
