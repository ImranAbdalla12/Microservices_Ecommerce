import firebase from 'firebase/app';
import 'firebase/auth';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBsSU3PM_zX4XdorRlqMeHKS5hXqpO3aBg",
  authDomain: "myecommerce-e7daa.firebaseapp.com",
  projectId: "myecommerce-e7daa",
  storageBucket: "myecommerce-e7daa.appspot.com",
  messagingSenderId: "275526958360",
  appId: "1:275526958360:web:6acdf7620da09e81a6f26d",
  measurementId: "G-C3EP8R0NVM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const authFirbase = firebase.default.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export default firebase;
