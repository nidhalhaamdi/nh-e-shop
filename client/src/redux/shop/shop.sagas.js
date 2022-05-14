/*  Importing-in certain EFFECTS from Saga
    These sagas allow us to do different things with the Store 
    like 'Creating Actions' or 'Listening to Actions'. 
*/
import { takeLatest, call, put, all } from 'redux-saga/effects';
/* takeEvery() : Listens for every Action of a specific type that we pass to it as 1st parameter
        The 2nd param will be another Generator Function that will run in response to the takeEvery Listener(1st param).
call() is a effect/method that takes a function as 1st argument, and the 2nd argument gets the parameter
        that you pass into the function call.
Inside of Saga generator function, Sagas don't dispatch actions using dispatch keyword,
        Instead they use another effect called 'put()': Saga Effect for crating actions. */              

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

// The Asynchronous function that does the Async. code that we want it to do.
export function* fetchCollectionsAsync() {
    // at every YIELD, we are yielding control over this saga (nraj3ou l control) back to the saga middleware library.
    try {
        const collectionRef = firestore.collection('collections'); // Creating our collectionRef
        const snapshot = yield collectionRef.get(); // API call to fetch back the data associated to this collectionRef
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

// Creating our first base Saga:
export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
}
// The whole purpose of the SagaMiddleware is => To Run these Sagas all CONCURRENTLY:
// Run them all together in a way that does not block the execution.