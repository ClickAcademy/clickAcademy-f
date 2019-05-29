$(function() {
  $("#barraMenuSuperior").load("menuSuperior.html");
  $("#barraMenuInferior").load("menuInferior.html");

  cargarUsuario();
  revisarSuscripcion();
});

function suscripcion() {}

function revisarSuscripcion() {}

function cargarUsuario() {
  let usuario = window.location.href;
  usuario = usuario.split("?");
  let urlEsp = url + "/aula.php";
  $.post(urlEsp, { buscarUsuario: usuario[1] }, function(respuesta) {
    respuesta = respuesta.split(",");
    document.title = respuesta[1];
    let titulonode = document.createTextNode(respuesta[1]);
    document.getElementById("nombreUsuario").appendChild(titulonode);
    // let generonode = document.createTextNode(respuesta[2]);
    // document.getElementById("abstractInfo").appendChild(abstractnode);
    // let fechanode = document.createTextNode(respuesta[3]);
    // document.getElementById("fecha").appendChild(fechanode);
    // let tablanode = document.createTextNode(respuesta[4]);
    // document.getElementById("tablaContenidoInfo").appendChild(tablanode);
    // let categorianode = document.createTextNode(respuesta[5]);
    // document.getElementById("categorias").appendChild(categorianode);

    // let usuarioNode = document.createTextNode(respuesta[6]);
    // document.getElementById("nombreUsuario").appendChild(usuarioNode);

    // let likesnode = document.createTextNode(respuesta[7]);
    // document.getElementById("likes").appendChild(likesnode);
    // let dislikesnode = document.createTextNode(respuesta[8]);
    // document.getElementById("dislikes").appendChild(dislikesnode);
  });
}

function visualizar(tipoArchivo, archivo) {
  var xhr = new XMLHttpRequest();
  let arch = document.getElementById("preview");
  xhr.responseType = "blob";
  xhr.onload = function() {
    arch.src = URL.createObjectURL(this.response);
    $("#preview")
      .parent()[0]
      .load(arch.src);
  };

  xhr.open("GET", archivo);
  xhr.send();
}

/**
 * correo
 * nombre
 * genero
 * fecha
 * url_banner
 * url_foto
 * pais
 * ciudad
 */