/**
 * Se revisa si hay una sesión iniciada al iniciar la aplicación
 */
function revisarUsuario() {
  let user = firebase.auth().currentUser;
  if (user) {
    firebase.auth().signOut();
  }
}

/**
 * Dirige a revisarusuario()
 * Toma los datos digitados
 * ingresa a firebase
 *    -> Error (alertas.js)
 *    -> Verificar confirmación
 *        -> Dirige a la pagina de inicio
 *        -> Confirma la cuenta
 */
function ingresar() {
  revisarUsuario();
  let correo = document.getElementById("correo").value;
  let contraseña = document.getElementById("contraseña").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(correo, contraseña)
    .then(function() {
      let usuario = firebase.auth().currentUser;
      verificarConfirmacionCuenta(usuario);
    })
    .catch(function(error) {
      errorModal(error.message, "Error iniciando sesión");
    });
}

function verificarConfirmacionCuenta(user) {
  if (user.emailVerified === false) {
    confirmarCuenta();
  } else if (user.emailVerified === true) {
    location.href = "./index.html";
  }
}

/**
 *  -> Envia correo de confirmación
 *  -> Error
 */
function confirmarCuenta() {
  confirmar("Su cuenta no ha sido verificada ¿Desea verificarla ahora?", "Aceptar").then(
    response => {
      var user = firebase.auth().currentUser;
      user
        .sendEmailVerification()
        .then(function() {
          success("Revisa " + user.email + " para confirmar tu cuenta");
        })
        .catch(function(error) {
          errorModal(
            error.message,
            "No se ha podido enviar el correo de confirmación"
          );
        });
    }
  );
}

/**
 * -> Envia correo de confirmación de cuenta
 * -> Error
 */
function recuperarContraseña() {
  var auth = firebase.auth();
  let correo = document.getElementById("correo").value;

  auth
    .sendPasswordResetEmail(correo)
    .then(function() {
      confirmar("¿Está seguro de que desea restablecer su contraseña?").then(
        response => {
          success("Se ha enviado un correo a " + correo);
        }
      );
    })
    .catch(function(error) {
      errorModal(error.message, "Ha ocurrido un error en el registro.");
    });
}

/**
 * Dirige a página de registro
 */
function crearCuenta() {
  location.href = "Registro.html";
}
