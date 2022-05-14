import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

// Middleware thatAllows our browser to actually cache our store now depending on certain configuration options.
import logger from 'redux-logger'; 

// Middleware that handles Asynchronous Actions inside of redux (handles side effects generally)
import createSagaMiddleware from 'redux-saga';

import rootSaga from "./root-saga";

import rootReducer from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();

// The middleware that the store is expecting from Redux is going to be an array.
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// After applyMiddleware() get called, we're going to Run and Add-in the individual Sagas that we're gonna write
// Or run all of them at once when the application starts up in one large sag = rootSaga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
