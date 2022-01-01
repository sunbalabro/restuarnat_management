import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBs4EYBPLsUAUMh4t1thcB_bSvKjjAXwmY",
  authDomain: "practise-ecommerce.firebaseapp.com",
  databaseURL: "https://practise-ecommerce-default-rtdb.firebaseio.com",
  projectId: "practise-ecommerce",
  storageBucket: "practise-ecommerce.appspot.com",
  messagingSenderId: "669745393656",
  appId: "1:669745393656:web:7688438d881f052f55b00d",
  measurementId: "G-DWETLRKEJ1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase