import { createStore, combineReducers } from 'redux';
import moodReducer from './moodReducer';
import emotPositionReducer from './emotPositionReducer';

const rootReducer = combineReducers({
  mood: moodReducer,
  emotPosition: emotPositionReducer,
});

const store = createStore(rootReducer);

export default store;
