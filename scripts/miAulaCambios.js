var usuarioGlobal;

firebase.auth().onAuthStateChanged(function(user) {
  usuarioGlobal = user.email;
});

$(document).on("change", ".ArchivoSeleccionar", function(evt) {
  let archivo_ruta = evt.target.value;
  let extension = tipoArchivo(archivo_ruta);
  pdffile = document.getElementById("botonCargarArchivo").files[0];
  pdffile_url = URL.createObjectURL(pdffile);
  switch (extension) {
    case "Imagen":
      $("#perfilCambio").attr("src", pdffile_url);
      $("#cambiosFotos").removeAttr("disabled");
      $("#cancelarFotos").removeAttr("disabled");
      break;
    default:
      errorModal(
        "Tipo de archivo inválido",
        "Asegurése de que el archivo que está intentando compartir cumple con los requisitos."
      );
      this.value = "";
      break;
  }
});
function tipoArchivo(archivo) {
  let ruta_separada = archivo.split(".");
  let extension = ruta_separada.pop();
  let extensionImagenPermitidas = ["png", "jpeg", "jpg", "gif"];

  let tipoArchivo;

  switch (String(extension.toLowerCase())) {
    case extensionImagenPermitidas.indexOf(extension) + 1 && extension:
      tipoArchivo = "Imagen";
      break;
  }
  return tipoArchivo;
}

/**
 * Cambios en la información pública
 */
function habilitarEdicionPublica() {
  document.getElementById("nombreUsuarioTab").removeAttribute("readonly");
  document.getElementById("apellidoUsuarioTab").removeAttribute("readonly");
  document.getElementById("generoUsuarioTab").removeAttribute("readonly");
  document.getElementById("paisUsuarioTab").removeAttribute("readonly");
  document.getElementById("ciudadUsuarioTab").removeAttribute("readonly");

  document.getElementById("guardarCambios").style.display = "block";
  document.getElementById("cancelar").style.display = "block";
  document.getElementById("editarInformacion").style.display = "none";
}
function cancelarCambiosPublica() {
  confirmar("Se perderán todos los cambios realizados", "Confirmar").then(
    response => {
      document.getElementById("nombreUsuarioTab").readOnly = true;
      document.getElementById("apellidoUsuarioTab").readOnly = true;
      document.getElementById("generoUsuarioTab").readOnly = true;
      document.getElementById("paisUsuarioTab").readOnly = true;
      document.getElementById("ciudadUsuarioTab").readOnly = true;

      document.getElementById("guardarCambios").style.display = "none";
      document.getElementById("cancelar").style.display = "none";
      document.getElementById("editarInformacion").style.display = "block";
      firebase.auth().onAuthStateChanged(function(user) {
        cargarUsuario(user.email);
      });
    }
  );
}
function guardarCambiosPublica() {
  confirmar("Se guardarán los cambios", "Confirmar").then(response => {
    let datos = [6];
    datos[0] = document.getElementById("nombreUsuarioTab").value;
    datos[1] = document.getElementById("apellidoUsuarioTab").value;
    datos[2] = document.getElementById("generoUsuarioTab").value;
    datos[3] = document.getElementById("paisUsuarioTab").value;
    datos[4] = document.getElementById("ciudadUsuarioTab").value;
    datos[5] = usuarioGlobal;
    if (validar(datos) === true) {
      let urlEsp = url + "/Registro.php";
      guardarBD(datos, urlEsp);
    } else {
      errorModal(null, "Revisa los datos ingresados");
    }
  });

  function validar(datos) {
    let seguir = true;
    let i0 = false,
      i1 = false;

    for (x = 0; x < datos.length; x++) {
      if (datos[x] === "") {
        switch (x) {
          case 0:
            i0 = true;
            break;
          case 1:
            i1 = true;
            break;
        }
        vacio = true;
        seguir = false;
      } else {
        vacio = false;
      }
    }

    if (i0 === true) {
      document.getElementById("nombreUsuarioTab").style.borderBottom =
        "3px solid red";
    } else {
      document.getElementById("nombreUsuarioTab").style.borderBottom = "none";
    }

    if (i1 === true) {
      document.getElementById("apellidoUsuarioTab").style.borderBottom =
        "3px solid red";
    } else {
      document.getElementById("apellidoUsuarioTab").style.borderBottom = "none";
    }
    return seguir;
  }

  function guardarBD(datos, url) {
    $.post(
      url,
      {
        actualizarDatos: datos
      },
      function(respuesta) {
        if (respuesta.trim() === "1") {
          document.getElementById("nombreUsuarioTab").readOnly = true;
          document.getElementById("apellidoUsuarioTab").readOnly = true;
          document.getElementById("generoUsuarioTab").readOnly = true;
          document.getElementById("paisUsuarioTab").readOnly = true;
          document.getElementById("ciudadUsuarioTab").readOnly = true;

          document.getElementById("guardarCambios").style.display = "none";
          document.getElementById("cancelar").style.display = "none";
          document.getElementById("editarInformacion").style.display = "block";
          firebase.auth().onAuthStateChanged(function(user) {
            cargarUsuario(user.email);
          });
          alertasPequeñas("Haz actualizado tu información");
        } else if (respuesta.trim() === "0") {
          errorModal("", "Ha ocurrido un error en el registro");
        }
      }
    );
  }
}

/**
 * Cambios danger zone
 */

function habilitarEdicionDZ() {
  document.getElementById("correoUsuarioTab").removeAttribute("readonly");
  document.getElementById("contraseñaUsuarioTab").removeAttribute("readonly");
  document.getElementById("guardarCambiosDZ").style.display = "block";
  document.getElementById("cancelarDZ").style.display = "block";
  document.getElementById("editarInformacionDZ").style.display = "none";
  document.getElementById("eliminarDZ").style.display = "none";
}
function cancelarCambiosDZ() {
  confirmar("Se perderán todos los cambios realizados", "Confirmar").then(
    response => {
      document.getElementById("correoUsuarioTab").readOnly = true;
      document.getElementById("contraseñaUsuarioTab").readOnly = true;

      document.getElementById("guardarCambiosDZ").style.display = "none";
      document.getElementById("cancelarDZ").style.display = "none";
      document.getElementById("editarInformacionDZ").style.display = "block";
      document.getElementById("eliminarDZ").style.display = "block";
      firebase.auth().onAuthStateChanged(function(user) {
        cargarUsuario(user.email);
      });
    }
  );
}
function guardarCambiosDZ() {
  confirmar("Se guardarán los cambios", "Confirmar").then(response => {
    let datos = [6];
    datos[0] = document.getElementById("correoUsuarioTab").value;
    datos[1] = document.getElementById("contraseñaUsuarioTab").value;
    datos[6] = usuarioGlobal;
    if (validarDZ(datos) === true) {
      let urlEsp = url + "/Registro.php";
      actualizarFirebase(datos)
        .then(resolve => {
          guardarBD(datos, urlEsp);
        })
        .catch(reject => {
          errorModal(
            "No se ha podido atualizar la información del usuario",
            reject
          );
        });
    } else {
      errorModal(null, "Revisa los datos ingresados");
    }
  });

  function validarDZ(datos) {
    let seguir = true;
    let i0 = false,
      i1 = false;

    for (x = 0; x < datos.length; x++) {
      if (datos[x] === "") {
        switch (x) {
          case 0:
            i0 = true;
            break;
          case 1:
            i1 = true;
            break;
        }
        vacio = true;
        seguir = false;
      } else {
        vacio = false;
      }
    }

    if (i0 === true) {
      document.getElementById("nombreUsuarioTab").style.borderBottom =
        "3px solid red";
    } else {
      document.getElementById("nombreUsuarioTab").style.borderBottom = "none";
    }

    if (i1 === true) {
      document.getElementById("apellidoUsuarioTab").style.borderBottom =
        "3px solid red";
    } else {
      document.getElementById("apellidoUsuarioTab").style.borderBottom = "none";
    }
    return seguir;
  }

  function actualizarFirebase(datos) {
    return new Promise(function(resolve, reject) {
      var user = firebase.auth().currentUser;
      user
        .updateEmail(datos[0])
        .then(function() {
          user
            .updatePassword(datos[1])
            .then(function() {
              resolve("Se actualizaron los datos del usuario");
            })
            .catch(function(error) {
              reject(error);
            });
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  function guardarBD(datos, url) {
    $.post(
      url,
      {
        actualizarDatos: datos
      },
      function(respuesta) {
        if (respuesta.trim() === "1") {
          document.getElementById("nombreUsuarioTab").readOnly = true;
          document.getElementById("apellidoUsuarioTab").readOnly = true;
          document.getElementById("generoUsuarioTab").readOnly = true;
          document.getElementById("nacimientoUsuarioTab").readOnly = true;
          document.getElementById("paisUsuarioTab").readOnly = true;
          document.getElementById("ciudadUsuarioTab").readOnly = true;

          document.getElementById("guardarCambios").style.display = "none";
          document.getElementById("cancelar").style.display = "none";
          document.getElementById("editarInformacion").style.display = "block";
          firebase.auth().onAuthStateChanged(function(user) {
            cargarUsuario(user.email);
          });
          alertasPequeñas("Haz actualizado tu información");
        } else if (respuesta.trim() === "0") {
          errorModal("", "Ha ocurrido un error en el registro");
        }
      }
    );
  }

  function eliminarFirebase() {}

  function eliminarBD(datos, url) {}
}
function cambiarFotoPerfil() {
  confirmar("Se cambiará la foto de perfil", "Aceptar").then(r => {
    $("#cambiosFotos").attr("disabled", true);
    $("#cancelarFotos").attr("disabled", true);
    archivo = document.getElementById("botonCargarArchivo").files[0];
    let storageService = firebase.storage();
    let refStorage = storageService.ref("Profile").child(archivo.name);
    let uploadTask = refStorage.put(archivo);

    uploadTask.on("state_changed", null, null, function() {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        var user = firebase.auth().currentUser;
        user
          .updateProfile({
            photoURL: downloadURL
          })
          .then(function() {
            cambiarURLBD(downloadURL);
            alertasPequeñas("Foto de perfil actualizada");
            recargarCambios();
          })
          .catch(function(error) {
            errorModal(error, "No se ha podido actualizar la foto de perfil");
            $("#cambiosFotos").removeAttr("disabled");
            $("#cancelarFotos").removeAttr("disabled");
          });
      });
    });
  });
  function cambiarURLBD(urlBD) {
    let datos = new Array();
    datos[0] = urlBD;
    datos[1] = usuarioGlobal;
    urlEsp = url + "./Registro.php";
    $.post(urlEsp, { fotoAct: datos }, respuesta => {
      if (respuesta.trim() == "0") {
        errorModal("No se actualizó la foto");
      } else if (respuesta.trim() == "1") {
        alertasPequeñas("Foto de perfil actualizada");
      }
    });
  }
}
function recargarCambios() {
  var user = firebase.auth().currentUser;
  $("#profile_picture").attr("src", user.photoURL);
  $("#perfilCambio").attr("src", user.photoURL);
}
function cancelarFotoPerfil() {
  confirmar("Se perderán los cambios", "Aceptar").then(r => {
    recargarCambios();
  });
}
