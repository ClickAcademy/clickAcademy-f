/**
 * Botón de esperar mientras se registra
 */
$(function() {
  $("#esperarRegistro").hide();
});
function esperarRegistro(estado) {
  if (estado === true) {
    $("#esperarRegistro").show();
    $("#registrarUsuario").hide();
  } else if (estado === false) {
    $("#esperarRegistro").hide();
    $("#registrarUsuario").show();
  }
}

/**
 * Función para registrar un usuario nuevo
 */
function registrar() {
  confirmar("¡Confirma tu registro en Click academy!", "Registrarse").then(
    response => {
      esperarRegistro(true);
      let datos = [5];
      datos[0] = document.getElementById("nombre").value;
      datos[1] = document.getElementById("apellido").value;
      datos[2] = document.getElementById("correo").value;
      datos[3] = document.getElementById("contraseña").value;
      datos[4] = document.getElementById("confirmar_contraseña").value;
      if (validar(datos) === true) {
        let urlEsp = url + "/Registro.php";
        usuarioRegistrado(datos, urlEsp)
          .then(response => {
            RegistrarFirebase(datos, urlEsp);
          })
          .catch(function(error) {
            error(error.message, "Ha ocurrido un error en el registro.");
            esperarRegistro(false);
          });
      } else {
        esperarRegistro(false);
        errorModal(null, "Revisa los datos ingresados");
      }
    }
  );
}

/**
 * Función para validar los datos ingresados
 */
function validar(datos) {
  let seguir = true;
  let i0 = false,
    i1 = false,
    i2 = false,
    i3 = false,
    i4 = false;

  for (x = 0; x < datos.length; x++) {
    if (datos[x] === "") {
      switch (x) {
        case 0:
          i0 = true;
          break;
        case 1:
          i1 = true;
          break;
        case 2:
          i2 = true;
          break;
        case 3:
          i3 = true;
          break;
        case 4:
          i4 = true;
          break;
      }
      vacio = true;
      seguir = false;
    } else {
      vacio = false;
    }
  }

  if (datos[3] !== datos[4]) {
    i3 = true;
    i4 = true;
    seguir = false;
  }
  if (datos[3] < 8) {
    i3 = true;
    seguir = false;
  }
  if (!/\w+@+\w+\.+[a-z]/.test(datos[2])) {
    i2 = true;
    seguir = false;
  }

  if (i0 === true) {
    document.getElementById("nombre").style.borderBottom = "3px solid red";
  } else {
    document.getElementById("nombre").style.borderBottom = "none";
  }

  if (i1 === true) {
    document.getElementById("apellido").style.borderBottom = "3px solid red";
  } else {
    document.getElementById("apellido").style.borderBottom = "none";
  }

  if (i2 === true) {
    document.getElementById("correo").style.borderBottom = "3px solid red";
  } else {
    document.getElementById("correo").style.borderBottom = "none";
  }

  if (i3 === true) {
    document.getElementById("contraseña").style.borderBottom = "3px solid red";
  } else {
    document.getElementById("contraseña").style.borderBottom = "none";
  }

  if (i4 === true) {
    document.getElementById("confirmar_contraseña").style.borderBottom =
      "3px solid red";
  } else {
    document.getElementById("confirmar_contraseña").style.borderBottom = "none";
  }
  return seguir;
}

/**
 * Función para buscar si existe el usuario en la base de datos
 */
function usuarioRegistrado(datos, url) {
  return new Promise(function(resolve, reject) {
    $.post(
      url,
      {
        usuarioRegistrado: datos.join(",")
      },
      function(respuesta) {
        let resp = parseInt(respuesta.trim());
        if (resp > 0) {
          var existente = new Error("El usuario ya está registrado");
          reject(existente);
        } else if (resp === 0) {
          resolve(respuesta);
        } else {
          reject(respuesta);
        }
      }
    );
  });
}

/**
 * Función para registrar usuario a firebase
 */
function RegistrarFirebase(datos, url) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(datos[2], datos[3])
    .then(function() {
      guardarBD(datos, url);
    })
    .catch(function(error) {
      errorModal(error.message, "Ha ocurrido un error en el registro");
      esperarRegistro(false);
    });
}

/**
 * Función para guardar usuario en la base de datos
 */
function guardarBD(datos, url) {
  $.post(
    url,
    {
      guardarDatos: datos.join(",")
    },
    function(respuesta) {
      if (respuesta.trim() === "1") {
        verificarUsuario();
      } else if (respuesta.trim() === "0") {
        errorModal("", "Ha ocurrido un error en el registro");
        esperarRegistro(false);
      }
    }
  );
}

/**
 * Función para verificar usuario
 */
function verificarUsuario() {
  var user = firebase.auth().currentUser;
  alert(user.email);
  if (user !== null) {
    user
      .sendEmailVerification()
      .then(function() {
        success("Has sido registrado en Click Academy");
        location.replace("./confirmarCuenta.html");
      })
      .catch(function(error) {
        errorModal(error.message, "No se ha logrado enviar la verificación");
        esperarRegistro(false);
      });
  }
}

function iniciarSesion() {
  location.href = "./iniciarSesion.html";
}
