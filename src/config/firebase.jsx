// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getFirebase, getFirestore } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";


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

export const fbApp = getApp()

export const auth = getAuth()

export const storage = getStorage()

/**
 * 
 * @param {*} uri
 * 
 * @returns
 */


export const listFiles = async () => {
  // Create a sreference under which you want to list
  const listRef = ref(storage, 'images');

  // Find all the prefixes and items.
  const listResp = await listAll(listRef)
  return listResp.items
}


/**
 * 
 * @param {*} uri
 * @param {*} name
 * 
 */

export const uploadToFirebase = async (uri, name, onProgress) => {

    const fetchResponse = await fetch(uri)
    const theBlob = await fetchResponse.blob()
    
   
    const imageRef = ref(getStorage(), `images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {

    uploadTask.on(
      'state_changed', 
      (snapshot) => {
      const progress = 
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      }, 
      (error) => {
        reject(error)
      }, 
      async () => {
        const dowloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
        resolve({
          dowloadUrl, 
          metadata : uploadTask.snapshot.metadata,
        })
      }
    );
    name = dowloadUrl
  })
}

export const listUpload = async (name) => {
  const listRef = ref(getStorage(), `images/${name}`);

  listAll(listRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      console.log('Listado com sucesso');
    });
    res.items.forEach((itemRef) => {
      console.log('Lista', name);
    });
  }).catch((error) => {
    console.log(error.message);
  });
}


export default{ app, getApp, getAuth, listFiles };

export const db = getFirestore(app)