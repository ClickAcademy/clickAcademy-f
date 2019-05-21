$(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var user = firebase.auth().currentUser;
      var confirmado = user.emailVerified;
      if (user != null && confirmado == false) {
        document.getElementById("correo").innerHTML = user.email;
      }
    } else {
      location.replace("index.html");
    }
  });
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
