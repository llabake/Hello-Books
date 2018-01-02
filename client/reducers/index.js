import { combineReducers } from 'redux';
import userReducer from './userReducer'
import bookReducer from './bookReducer';

const rootReducer = combineReducers({
  userReducer,
  bookReducer
});

export default  rootReducer;