$(function() {
  $("#barraMenuSuperior").load("menuSuperior.html");
  $("#barraMenuInferior").load("menuInferior.html");
  display();
});

function display() {
  let archivo = window.location.href;
  archivo = archivo.split("?");
  let urlEsp = url + "/Archivos.php";
  $.post(urlEsp, { buscarArchivo: archivo[1] }, function(respuesta) {
    respuesta = respuesta.split(" }*{ ");
    visualizar(respuesta[7], respuesta[0]);
    revisarUsuario(respuesta[8]);
    document.title = respuesta[1];
    let titulonode = document.createTextNode(respuesta[1]);
    document.getElementById("tituloArchivo").appendChild(titulonode);
    let abstractnode = document.createTextNode(respuesta[2]);
    document.getElementById("abstractInfo").appendChild(abstractnode);
    let fechanode = document.createTextNode(respuesta[3]);
    document.getElementById("fecha").appendChild(fechanode);
    let tablanode = document.createTextNode(respuesta[4]);
    document.getElementById("tablaContenidoInfo").appendChild(tablanode);
    let categorianode = document.createTextNode(respuesta[5]);
    document.getElementById("categorias").appendChild(categorianode);

    let usuarioNode = document.createTextNode(respuesta[6]);
    document.getElementById("nombreUsuario").appendChild(usuarioNode);

    let likesnode = document.createTextNode(respuesta[9]);
    document.getElementById("likes").appendChild(likesnode);
    let dislikesnode = document.createTextNode(respuesta[10]);
    document.getElementById("dislikes").appendChild(dislikesnode);
  });
}

function visualizar(tipoArchivo, archivo) {
  switch (tipoArchivo) {
    case "Video":
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = function() {
        let arch = document.getElementById("ver");
        arch.src = URL.createObjectURL(this.response);
        $("#ver")
          .parent()[0]
          .load(arch.src);
      };

      xhr.open("GET", archivo);
      xhr.send();
      document.getElementById("fitDiv").style.display = "block";
      break;
    case "Documento":
      ArreglarUrl(archivo)
        .then(response => {
          let doc = document.getElementById("DOC");
          doc.src =
            "https://docs.google.com/gview?url=" + response + "&embedded=true";
          document.getElementById("DOC").style.display = "block";
        })
        .catch(error => {
          errorModal(error, "No se ha podido mostrar el archivo");
        });
      break;
    case "Presentación":
      ArreglarUrl(archivo)
        .then(response => {
          let doc = document.getElementById("DOC");
          doc.src =
            "https://docs.google.com/gview?url=" + response + "&embedded=true";
          document.getElementById("DOC").style.display = "block";
        })
        .catch(error => {
          errorModal(error, "No se ha podido mostrar el archivo");
        });
      break;
    case "PDF":
      // let pdf = document.getElementById("DocPre");
      ArreglarUrl(archivo)
        .then(response => {
          let doc = document.getElementById("DOC");
          doc.src =
            "https://docs.google.com/gview?url=" + response + "&embedded=true";
          document.getElementById("DOC").style.display = "block";
        })
        .catch(error => {
          errorModal(error, "No se ha podido mostrar el archivo");
        });
      break;
    case "Imagen":
      $("#Img").attr("src", archivo);
      document.getElementById("Img").style.display = "block";
      break;
    default:
      errorModal("Error", "No es posible visualizar el archivo");
      break;
  }
}

function ArreglarUrl(urlarch) {
  return new Promise(function(resolve, reject) {
    let apiKey = "R_4fe6a400ffe842628cff54c1d216e238";
    let userName = "o_78uhp4gn15";
    $.ajax({
      url:
        "https://api-ssl.bitly.com/v3/shorten?login=" +
        userName +
        "&apiKey=" +
        apiKey +
        "&format=json&longUrl=" +
        encodeURIComponent(urlarch),
      dataType: "jsonp",
      success: function(response) {
        if (response.status_code == 500) {
          reject("Error: Invalid link.");
        } else if (response.status_code != 200) {
          reject("Error: Service unavailable.");
        } else resolve(response.data.url);
      },

      contentType: "application/json"
    });
  });
}

function likes() {
  let archivo = window.location.href;
  archivo = archivo.split("?");
  id_archivo = archivo[1];
  var user = firebase.auth().currentUser;
  let correo = user.email;
  let urlEsp = url + "/Archivos.php";
  datos = new Array();
  datos[0] = correo;
  datos[1] = id_archivo;
  var enviarDatos = datos.toString();
  $.post(urlEsp, { likes: enviarDatos }, function(respuesta) {
    alert("Entro" + respuesta);
  });
}

function dislikes() {
  let archivo = window.location.href;
  archivo = archivo.split("?");
  id_archivo = archivo[1];
  var user = firebase.auth().currentUser;
  let correo = user.email;
  let urlEsp = url + "/Archivos.php";
  datos = new Array();
  datos[0] = correo;
  datos[1] = id_archivo;
  var enviarDatos = datos.toString();
  $.post(urlEsp, { dislikes: enviarDatos }, function(respuesta) {
    alert(respuesta);
  });
}

function revisarUsuario(informacion) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user.email == informacion) {
      let divElemento = document.createElement("DIV");
      divElemento.setAttribute("id", "divBotones");
      let boton = document.createElement("BUTTON");
      boton.setAttribute("id", "botonEditar");
      boton.innerHTML = "Editar";
      boton.setAttribute("onclick", "editarInformacion()");

      let boton2 = document.createElement("BUTTON");
      boton2.setAttribute("id", "botonEliminar");
      boton2.innerHTML = "Eliminar";
      boton2.setAttribute("onclick", "eliminarArchivo()");

      divElemento.appendChild(boton);
      divElemento.appendChild(boton2);
      document.getElementById("calificacion").appendChild(divElemento);
    }
  });
}

function editarInformacion() {
  Swal.mixin({
    confirmButtonText: "Continuar &rarr;",
    confirmButtonColor: "#00716f",
    showCancelButton: true,
    progressSteps: ["1", "2", "3", "4", "5"]
  })
    .queue([
      {
        title: "Editar archivo",
        text: "Completar únicamente los campos que se desean editar"
      },
      {
        title: "Nombre",
        input: "text"
      },
      {
        title: "Abstract",
        input: "textarea"
      },
      {
        title: "Tabla de contenido",
        input: "textarea"
      }
    ])
    .then(result => {
      if (result.value) {
        guardarBD(result.value)
          .then(r => {
            alertasPequeñas(r);
            limpiarCampos();
          })
          .catch(err => {
            errorModal(err);
          });
      }
    });
}

function guardarBD(datos) {
  return new Promise(function(resolve, reject) {
    let archivo = window.location.href;
    archivo = archivo.split("?");
    datos.shift();
    datos.unshift(archivo[1]);

    let urlEsp = url + "./Archivos.php";
    $.post(urlEsp, { actualizarVideo: datos }, function(respuesta) {
      if (respuesta.trim() == "0") {
        reject("No se ha logrado actualizar el archivo");
      } else if (respuesta.trim() == "1") {
        resolve("Estamos actualizando los cambios");
      }
    });
  });
}

function limpiarCampos() {
  let archivo = window.location.href;
  archivo = archivo.split("?");
  let urlEsp = url + "./Archivos.php";
  $.post(urlEsp, { buscarArchivo: archivo[1] }, function(respuesta) {
    respuesta = respuesta.split(" }*{ ");
    document.getElementById("tituloArchivo").innerHTML = "";
    document.getElementById("abstractInfo").innerHTML = "";
    document.getElementById("tablaContenidoInfo").innerHTML = "";

    let titulonode = document.createTextNode(respuesta[1]);
    document.getElementById("tituloArchivo").appendChild(titulonode);
    let abstractnode = document.createTextNode(respuesta[2]);
    document.getElementById("abstractInfo").appendChild(abstractnode);
    let tablanode = document.createTextNode(respuesta[4]);
    document.getElementById("tablaContenidoInfo").appendChild(tablanode);
  });
}

function eliminarArchivo() {
  let archivo = window.location.href;
  archivo = archivo.split("?");
  let urlEsp = url + "./Archivos.php";

  eliminarArchivoBD(archivo[1], urlEsp)
    .then(urlfb => {
      // urlfb = urlfb.split(", ");
      // alert(urlfb[1]);
      // let storageRef = firebase.storage();
      // let desertRef = storageRef
      //   .ref(urlfb[1])
      //   .child("plantilla_presentacion_institucional");
      // desertRef
      //   .delete()
      //   .then(function() {
      successRedirect("Archivo eliminado correctamente", "./index.html");
      // })
      // .catch(error => {
      //   errorModal(error, "Ha ocurrido un error");
      // });
    })
    .catch(error => {
      errorModal(error);
    });

  function eliminarArchivoBD(archivo, url) {
    return new Promise(function(resolve, reject) {
      $.post(url, { eliminarArchivo: archivo }, function(respuesta) {
        if (respuesta.trim() == "0") {
          reject("No se ha podido eliminar el archivo");
        } else {
          resolve(respuesta);
        }
      });
    });
  }
}
