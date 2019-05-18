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
if (!firebase.apps.length) {
  firebase.initializeApp();
}
var url = "https://click-academy.herokuapp.com";

$(function() {
  $("#barraMenuSuperior").load("menuSuperior.html");
  $("#barraMenuInferior").load("menuInferior.html");
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      location.replace("index.html");
    }
  });
});

function almacenarArchivo() {
  validarDatos()
    .then(datos => {
      let extension = tipoArchivo(datos[6]);
      datos.pop();
      subirArchivo(datos[5], extension)
        .then(response => {
          datos.pop();
          datos.push(response);
          urlEsp = url + "./Archivos.php";
          guardarBD(datos, urlEsp)
            .then(response => {
              success(
                "Se ha compartido el archvio exitosamente",
                "./index.html"
              );
            })
            .catch(error => {
              errorModal(
                error,
                "No se ha podido almacenar la información del archivo"
              );
            });
        })
        .catch(error => {
          errorModal(error, "No se ha podido almacenar el archivo");
        });
    })
    .catch(error => {
      errorModal(error, "");
    });
}

function validarDatos() {
  return new Promise(function(resolve, reject) {
    let datos = [7];
    datos[0] = document.getElementById("nombre").value;
    datos[1] = document.getElementById("descripcion").value;
    datos[2] = document.getElementById("tablaContenidos").value;
    let categoriaOpciones = document.getElementById("categoria");
    datos[3] = categoriaOpciones.options[categoriaOpciones.selectedIndex].text;
    datos[4] = firebase.auth().currentUser.email;
    datos[5] = document.getElementById("botonCargarArchivo").files[0];
    datos[6] = document.getElementById("botonCargarArchivo").value;

    let validar = false;
    datos.forEach(element => {
      if (element == "") {
        validar = false;
      } else {
        validar = true;
      }
    });

    if (validar === true) {
      resolve(datos);
    } else {
      reject("Todos los campos son obligatorios");
    }
  });
}

function tipoArchivo(archivo) {
  let ruta_separada = archivo.split(".");
  let extension = ruta_separada.pop();
  let extensionesVideoPermitidas = ["mp4", "wav", "wma", "m4a"];

  let tipoArchivo;

  switch (String(extension.toLowerCase())) {
    case "docx":
      tipoArchivo = "DOCX";
      break;
    case "pptx":
      tipoArchivo = "PPTX";
      break;

    case extensionesVideoPermitidas.indexOf(extension) + 1 && extension:
      tipoArchivo = "VIDEO";
      break;
  }
  return tipoArchivo;
}

function subirArchivo(archivo, extension) {
  return new Promise(function(resolve, reject) {
    let storageService = firebase.storage();
    let barraProgreso = document.getElementById("barraProgreso");
    let refStorage = storageService.ref(extension).child(archivo.name);
    let uploadTask = refStorage.put(archivo);

    uploadTask.on(
      "state_changed",
      registrandoEstadoSubida,
      errorSubida,
      finSubida
    );

    function registrandoEstadoSubida(snapshot) {
      var porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      barraProgreso.value = porcentaje;
    }

    function errorSubida(err) {
      reject(err);
    }

    function finSubida() {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        resolve(downloadURL);
      });
    }
  });
}

function guardarBD(datos, url) {
  return new Promise(function(resolve, reject) {
    $.post(
      url,
      {
        subirArchivo: datos.join(",")
      },
      function(respuesta) {
        let resp = parseInt(respuesta.trim());
        if (resp === "1") {
          resolve("Se registró");
        } else if (resp === "0") {
          reject("Ha ocurrido un error subiendo el video");
        }
      }
    );
  });
}
