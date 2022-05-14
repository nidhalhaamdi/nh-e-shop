import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

/* - The Provider is a component that we want to wrap around the entire application, 
because we want everything inside to have access to the "STORE Object" that we get from Redux.
- This Provider, as a parent, allows us to get access to all the things related to the Store
that we're going to put all of the actual code we want to store on our Redux state. */
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

/* the Provider is this component class that we get from react redux that once passed 
the store object will be able to give that redux store context to the rest of the application
so we can dispatch actions to that store or we can actually pull values off of the store 
and into our components. */

