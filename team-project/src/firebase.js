import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCSsfxMuSZmHErrDPQ9EE2DEtvfga4JO80",
  authDomain: "team-project-db.firebaseapp.com",
  projectId: "team-project-db",
  storageBucket: "team-project-db.appspot.com",
  messagingSenderId: "505714360028",
  appId: "1:505714360028:web:e68499efab0ddab6acfe19",
  measurementId: "G-088JFK70KZ",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db };