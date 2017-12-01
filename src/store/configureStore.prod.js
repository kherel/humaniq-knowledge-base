import {createStore} from 'redux';
import reducer from 'rootReducer';


const store = (initialState = {}) => createStore(
  reducer,
  initialState,
)

export default store;