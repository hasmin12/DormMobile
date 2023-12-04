import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer } from './reducers/UserReducers';

const reducer = combineReducers({
  auth: authReducer,
});

const middleware = [thunk];
const initialState = {}; // Define your initial state as needed

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;