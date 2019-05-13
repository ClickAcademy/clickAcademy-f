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

function inicio() {
  location.href = "./index.html";
}

function miAulaBoton() {
  location.href = "./miAula.html";
}

function ingresarBoton() {
  location.href = "./iniciarSesion.html";
}

function subirArchivo() {
  location.href = "./subirArchivo.html";
}

function cerrarSesion() {
  let user = firebase.auth().currentUser;
  if (user) {
    firebase
      .auth()
      .signOut()
      .then(function() {
        alertas("Has cerrado sesión en este dispositivo.").then(response => {
          location.href = "./index.html";
        });
      });
  }
}

function buscar() {}

function categoriaDocumentos() {}

function categoriaVideos() {}

function categoriaPresentaciones() {}
