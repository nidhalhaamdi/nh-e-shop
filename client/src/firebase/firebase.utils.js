import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // For the Database
import 'firebase/compat/auth'; // For the authentification

const config = {
    apiKey: "AIzaSyA6S8xbyzatz4AABfF9BBQ1AI5w0ZR2BAU",
    authDomain: "e-commerce-db-45b85.firebaseapp.com",
    projectId: "e-commerce-db-45b85",
    storageBucket: "e-commerce-db-45b85.appspot.com",
    messagingSenderId: "579196195106",
    appId: "1:579196195106:web:a1f902aa5e56d6042fd57b",
    measurementId: "G-V09HV1ND2Q"
};

// creating user profile in our database
// Asynchronous function because we are making an API request
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`); // 'Query'

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        // Asynchronous request to our Database to store that data
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    
    return await batch.commit();
};

// Convert snapshot to OBJECT instead of ARRAY that we get back
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
      const { title, items } = doc.data();
  
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items,
      };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

firebase.initializeApp(config);

// Mimicking same functionality that we may encounter when we don't have firebase as the backend !
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider(); // GoogleAuthProvider is a class within auth library
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

