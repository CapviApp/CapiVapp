// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getFirebase, getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhRt3HekJo9ks74Fv1TvXBBFFB5-_NLW8",
  authDomain: "capivapp.firebaseapp.com",
  projectId: "capivapp",
  storageBucket: "capivapp.appspot.com",
  messagingSenderId: "152785443903",
  appId: "1:152785443903:web:ccad32463eca13a9f3ac8a",
  measurementId: "G-BZJ642BGNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const auth = getAuth()

export default{ app, getApp, getAuth };

export const db = getFirestore(app)