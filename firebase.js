// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCq_yu318xkC6Y06a0VKZRTYNMXRsF2vc",
  authDomain: "rn-instagram-923bd.firebaseapp.com",
  projectId: "rn-instagram-923bd",
  storageBucket: "rn-instagram-923bd.appspot.com",
  messagingSenderId: "87601806030",
  appId: "1:87601806030:web:ef70e51dbac1341e97ae9f",
};

// Initialize Firebase

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const db = firebase.firestore();

export default firebase;
