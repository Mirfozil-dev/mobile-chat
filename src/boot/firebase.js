// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAiCLZ4k9tM7Gb_amBY2cR36Lsay-qXDyQ",
    authDomain: "quasarchat-2d46d.firebaseapp.com",
    databaseURL: "https://quasarchat-2d46d.firebaseio.com",
    projectId: "quasarchat-2d46d",
    storageBucket: "quasarchat-2d46d.appspot.com",
    messagingSenderId: "384663793684",
    appId: "1:384663793684:web:d901595f876bd07567f701",
    measurementId: "G-CGTPB73DKN"
  };
  // Initialize Firebase
  let firebaseApp = firebase.initializeApp(firebaseConfig);
  let firebaseAuth = firebaseApp.auth();
  let firebaseDb = firebaseApp.database();

  export { firebaseAuth, firebaseDb }
  firebase.analytics();