// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// import {db} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPyfovD8HzM8rexkVrS_yMicYdks5zLhY",
  authDomain: "i-r-e-s.firebaseapp.com",
  projectId: "i-r-e-s",
  storageBucket: "i-r-e-s.appspot.com",
  messagingSenderId: "852460818213",
  appId: "1:852460818213:web:cf1f97e01fef6fd86b54cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();