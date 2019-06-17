import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyCvyUWtDkW2zrUHYcFHhHXKDoHSMwS6uHQ',
  authDomain: 'lcbbet-3f132.firebaseapp.com',
  databaseURL: 'https://lcbbet-3f132.firebaseio.com',
  projectId: 'lcbbet-3f132',
  storageBucket: 'lcbbet-3f132.appspot.com',
  messagingSenderId: '567508649921'
};

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

export default {
  db
};
