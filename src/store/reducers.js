import { combineReducers } from 'redux';
import CommonReducer from './common/reducers/common.reducers';
import StudentReducer from './common/reducers/student.reducers';

const rootReducers = combineReducers({
  common: CommonReducer,
  application: StudentReducer,
});

export default rootReducers;
