import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDtkw8lOwvL68TiBGQ6FMmjIjTbrbUq30g",
  authDomain: "venmas-d79a7.firebaseapp.com",
  databaseURL: "https://venmas-d79a7-default-rtdb.firebaseio.com",
  projectId: "venmas-d79a7",
  storageBucket: "venmas-d79a7.appspot.com",
  messagingSenderId: "923121641966",
  appId: "1:923121641966:web:9bf98ba588272a5a62c6ff"
};
  
 const firebaseApp  = firebase.initializeApp(config);

export default firebaseApp;
