$(function() {
  $("#barraMenuSuperior").load("menuSuperior.html");
  $("#barraMenuInferior").load("menuInferior.html");
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      location.replace("index.html");
    }
  });
});

$(document).on("change", ".ArchivoSeleccionar", function(evt) {
  let archivo_ruta = evt.target.value;
  let extension = tipoArchivo(archivo_ruta);
  switch (extension) {
    case "Video":
      let $source = $("#ver");
      alert(this.files[0]);
      $source[0].src = URL.createObjectURL(this.files[0]);
      $source.parent()[0].load();
      break;
    default:
      errorModal(
        "Tipo de archivo inválido",
        "Asegurése de que el archivo que está intentando compartir cumple con los requisitos."
      );
      this.value = "";
      alert(this.value);
      break;
  }
});
$(document).on();

function almacenarArchivo() {
  validarDatos()
    .then(datos => {
      let extension = tipoArchivo(datos[6]);
      datos.pop();
      subirArchivo(datos[5], extension)
        .then(response => {
          datos.pop();
          datos.push(response);
          datos.push(extension);
          urlEsp = url + "./Archivos.php";
          guardarBD(datos, urlEsp)
            .then(guardado => {
              successRedirect(guardado, "./index.html");
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
  let extensionesVideoPermitidas = ["m4v", "avi", "mpg", "mp4", "mov", "mpeg"];

  let tipoArchivo;

  switch (String(extension.toLowerCase())) {
    case "docx":
      tipoArchivo = "Documento";
      break;
    case "pptx":
      tipoArchivo = "Presentación";
      break;
    case extensionesVideoPermitidas.indexOf(extension) + 1 && extension:
      tipoArchivo = "Video";
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
        subirArchivo: datos.join("}*{")
      },
      function(respuesta) {
        let resp = parseInt(respuesta.trim());
        if (resp === 1) {
          resolve("Se ha compartido el archivo exitosamente");
        } else if (resp === 0) {
          reject("Ha ocurrido un error subiendo el video");
        } else {
          reject(respuesta);
        }
      }
    );
  });
}

function validar() {
  $(document).on("change", ".ArchivoSeleccionar", function(evt) {
    let archivo = evt.target.value;
    let ruta_separada = archivo.split(".");
    let extension = ruta_separada.pop();
    let extensionesVideoPermitidas = ["m4v", "avi", "mpg", "mp4", "mov", "mpeg"];
    let extensionImagenPermitidas=["png","jpeg","jpg","gif"];
    pdffile=document.getElementById("botonCargarArchivo").files[0]; 
    pdffile_url=URL.createObjectURL(pdffile); 
    switch (String(extension.toLowerCase())) {
      case "docx":
  
          $('#Word').attr('src',pdffile_url); 
            document.getElementById("Word").style.display = 'block';
      break;
  
      case extensionImagenPermitidas.indexOf(extension)+1 && extension:
          $('#Img').attr('src',pdffile_url); 
            document.getElementById("Img").style.display = 'block';
        break;
  
        case "pdf": //pendiente eliminar solo es de prueba
        $('#DocPre').attr('src',pdffile_url); 
          document.getElementById("DocPre").style.display = 'block';
      break;
  
      case "pptx":
          $('#DocPre').attr('src',prueba); 
        document.getElementById("DocPre").style.display = 'block';
        break;
        
      case extensionesVideoPermitidas.indexOf(extension) + 1 && extension:
          let $source = $("#ver");
          $source[0].src = URL.createObjectURL(this.files[0]);
          $source.parent()[0].load();
          document.getElementById("fitDiv").style.display = 'block';
        break;
    }
    return tipoArchivo;
  });
  }
  
  