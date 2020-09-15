import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCLxc61h0u8FF7TNZunMY8lSEOsm8TFU_c",
  authDomain: "awitter.firebaseapp.com",
  databaseURL: "https://awitter.firebaseio.com",
  projectId: "awitter",
  storageBucket: "awitter.appspot.com",
  messagingSenderId: "967486347919",
  appId: "1:967486347919:web:0a7890bb2eda42df376efa",
};

export default firebase.initializeApp(firebaseConfig);
