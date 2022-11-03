import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthReducer';
import skillReducer from './SkillReducer';
import programReducer from './ProgramReducer';
import collectionReducer from './CollectionReducer';
import testReducer from './TestReducer';
import examReducer from './ExamReducer';
import utilsReducer from './UtilsReducer';

const store = configureStore({
	reducer: {
		auth: authReducer,
		skill: skillReducer,
		program: programReducer,
		collection: collectionReducer,
		test: testReducer,
		exam: examReducer,
		utils: utilsReducer,
	},
});

export enum StoreNames {
	AUTH = 'auth',
	SKILL = 'skill',
	PROGRAM = 'program',
	COLLECTION = 'collection',
	TEST = 'test',
	EXAM = 'exam',
	UTILS = 'utils',
}
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
