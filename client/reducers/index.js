import { combineReducers } from 'redux';
import userReducer from './userReducer'
import bookReducer from './bookReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  userReducer,
  bookReducer,
  adminReducer,
});

export default  rootReducer;