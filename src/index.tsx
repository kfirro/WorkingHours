import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyA3YPIs6jkbbobnUpKujRJ7QIEDtQhg1fI",
  authDomain: "workinghours-app.firebaseapp.com",
  databaseURL: "https://workinghours-app.firebaseio.com",
  projectId: "workinghours-app",
  storageBucket: "workinghours-app.appspot.com",
  messagingSenderId: "980245857424",
  appId: "1:980245857424:web:0a48b894f14ccd4f2e0415",
  measurementId: "G-HJ2XB0GJJ7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
googleAuthProvider.setCustomParameters({
  'login_hint': 'user@example.com'
});
export { auth , googleAuthProvider};
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
