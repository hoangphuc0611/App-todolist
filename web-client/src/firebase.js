import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDPuYlXgui_Y00ILWVbGHlKh1WsbKc62Js",
  authDomain: "team-project-802c5.firebaseapp.com",
  projectId: "team-project-802c5",
  storageBucket: "team-project-802c5.appspot.com",
  messagingSenderId: "685208731388",
  appId: "1:685208731388:web:5c4f1106ef572e555c2179",
  measurementId: "G-LYFGKK1X9P",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
