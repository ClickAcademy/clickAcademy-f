// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB_PY_yBSbnlOfGPyLknxiY0g2G9Bz639Q",
  authDomain: "ucc-tube.firebaseapp.com",
  databaseURL: "https://ucc-tube.firebaseio.com",
  projectId: "ucc-tube",
  storageBucket: "ucc-tube.appspot.com",
  messagingSenderId: "492743461618",
  appId: "1:492743461618:web:c50345deb5787c74"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Obtener Elementos

var uploader = document.getElementById("uploader");

// Servicios de APIs Firebase
var authService = firebase.auth();
var storageService = firebase.storage();
var url_;

window.onload = function() {
  authService.signInAnonymously().catch(function(error) {
    console.error("Detectado error de autenticación", error);
  });

  //manejador de evento para el input file
  document
    .getElementById("fileButton")
    .addEventListener("change", function(evento) {
      evento.preventDefault();

      var archivo = evento.target.files[0];
      let file = document.getElementById("fileButton").value;
      alert(file);
      var extenson = fileValidation(file);
      alert("Tipo  " + extenson);
      subirArchivo(archivo, extenson);
    });
};

// defino el uploadTask como variable global
var uploadTask;
function subirArchivo(archivo, extension) {
  var refStorage = storageService.ref(extension).child(archivo.name);
  uploadTask = refStorage.put(archivo);

  // El evento donde comienza el control del estado de la subida
  uploadTask.on(
    "state_changed",
    registrandoEstadoSubida,
    errorSubida,
    finSubida
  ); //

  //Callbacks para controlar los distintos instantes de la subida
  function registrandoEstadoSubida(snapshot) {
    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    uploader.value = percentage;
  }

  function errorSubida(err) {
    console.log("Error al subir el archivo", err);
  }
  function finSubida() {
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log("File available at", downloadURL);
    });
  }
}

//validar la extension de los archivos que se desean subir
function fileValidation(file) {
  var path_splitted = file.split(".");
  var extension = path_splitted.pop();
  //var allowedExtensions = /(mp4|wav|wma|m4a)$/i;
  var allowedExtensions = ["mp4", "wav", "wma", "m4a"];

  var file;

  switch (String(extension.toLowerCase())) {
    case "docx":
      alert("es docx");
      file = "DOCX";
      break;

    case "pptx":
      alert("es pptx");
      file = "PPTX";
      break;

    case allowedExtensions.indexOf(extension) + 1 && extension:
      alert("es video");
      file = "VIDEO";
      break;
  }
  return file;
}
