// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCvU_j6FWIFRN1TrKx1f-91ky2E5n3AqoM",
  authDomain: "click-academy.firebaseapp.com",
  databaseURL: "https://click-academy.firebaseapp.com",
  projectId: "click-academy",
  storageBucket: "click-academy.appspot.com",
  messagingSenderId: "372540974455",
  appId: "1:372540974455:web:de23c4eaf36bfdc0"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var url = "https://click-academy.herokuapp.com";
