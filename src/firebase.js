
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDGJ4-CWxkSwjLKdVEZsOlZ9uKAnBSaOY0",
  authDomain: "clone-97aff.firebaseapp.com",
  projectId: "clone-97aff",
  storageBucket: "clone-97aff.appspot.com",
  messagingSenderId: "14870408264",
  appId: "1:14870408264:web:ba99f09e23849b2279bc7d"
};

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  
  export { db, auth };