import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    apiKey:'AIzaSyAq_8f1FIN5M9JWT1sWoW2rc-FuFtEVtfM',
    authDomain: "dinhdai-2003.firebaseapp.com",
    databaseURL: "https://dinhdai-2003-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dinhdai-2003",
    storageBucket: "dinhdai-2003.appspot.com",
    messagingSenderId: "246649434352",
    appId: "1:246649434352:web:5c99fb62aa265373839235",
    measurementId: "G-HX40C29TDC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export  {db,auth, provider};