import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCZniHhiyRUO-sC85JP9jMFWTmvC1HQjHc",
  authDomain: "team-project-4918b.firebaseapp.com",
  projectId: "team-project-4918b",
  storageBucket: "team-project-4918b.appspot.com",
  messagingSenderId: "426333169659",
  appId: "1:426333169659:web:461010b95a1217c0f98d5e",
  measurementId: "G-NZ78T25DRP",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db };