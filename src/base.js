import Rebase from 're-base';
import firebase from "firebase"


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBS6lZG0CR-57iWSb3vYBjcWZNOnmXUQdc",
  authDomain: "catch-of-the-day-cf868.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-cf868.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

//this is a named export
export { firebaseApp };

//this is a default export
export  default base;