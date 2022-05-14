// Root REDUCER : The actual base reducer object that represents all of the state of our application.
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

// Importing the type of storage we want ..
import storage from 'redux-persist/lib/storage';
// we're gettin' here the actual localStorage object on our window browser:
// Using localStorage as default Storage

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

// defining new persist config : ==> a JSON object that represents the possible configurations
// that we want for Redux process to use.
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);

/*  So this will return back this modified version of our reducer with this persist config on top of it.
    It's a modified version of our rootReducer, except now, 'with persistance capabilities' 
    thanks to this persistReducer function that we got from redux-persist. 
*/