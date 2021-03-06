import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (<any>window).__REDUX_DEVTOOLS_EXTENSION__ ? (<any>window).__REDUX_DEVTOOLS_EXTENSION__() 
    : (f:any) => f
  )
);

export default store;