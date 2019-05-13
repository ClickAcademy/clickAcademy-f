// Initialize Firebase
var config = {
  apiKey: "AIzaSyCvU_j6FWIFRN1TrKx1f-91ky2E5n3AqoM",
  authDomain: "click-academy.firebaseapp.com",
  databaseURL: "https://click-academy.firebaseio.com",
  projectId: "click-academy",
  storageBucket: "click-academy.appspot.com",
  messagingSenderId: "372540974455",
  appId: "1:372540974455:web:de23c4eaf36bfdc0"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;
    var confirmado = user.isEmailVerified();
    if (user != null && confirmado == false) {
      document.getElementById("correo").innerHTML = user.email;
    }
  } else {
    location.replace("index.html");
  }
});

function salir() {
  firebase
    .auth()
    .signOut()
    .catch(function(error) {
      alert(error);
    });
}

function reenviarConfirmacion() {
  var user = firebase.auth().currentUser;
  alert(user.email);
  if (user !== null) {
    user
      .sendEmailVerification()
      .then(function() {
        alert("Se ha reenviado el correo de confirmación");
      })
      .catch(function(error) {
        alert(error);
      });
  }
}
