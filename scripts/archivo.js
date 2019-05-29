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
    respuesta = respuesta.split(", ");
    // window.history.pushState("", respuesta[1], archivo[0] +"/"+respuesta[1]+"/");
    visualizar("", respuesta[0]);
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

    let likesnode = document.createTextNode(respuesta[7]);
    document.getElementById("likes").appendChild(likesnode);
    let dislikesnode = document.createTextNode(respuesta[8]);
    document.getElementById("dislikes").appendChild(dislikesnode);
  });
}

function visualizar(tipoArchivo, archivo) {
  var xhr = new XMLHttpRequest();
  let arch = document.getElementById("preview");
  xhr.responseType = "blob";
  xhr.onload = function() {
    arch.src = URL.createObjectURL(this.response);
    $("#preview").parent()[0].load(arch.src);
  };

  xhr.open("GET", archivo);
  xhr.send();
}
//pendiente codigo de likes y dislikes 
// function usuario(){
//   var user = firebase.auth().currentUser;
//   email = user.email;
//   window.location=url + "/archivo.php?EmailUsuario=email";
// }



function likes()
{

  let archivo = window.location.href;
  archivo = archivo.split("?");
  id_archivo = archivo[1];

  var user = firebase.auth().currentUser;
 let correo = user.email;
  let urlEsp = url + "/Archivos.php";
  $.post(urlEsp, { likes: correo, id_archivo }, function(respuesta)  {
    alert(respuesta);
  });
}



function dislikes()
{
  var user = firebase.auth().currentUser;
 let correo = user.email;
  let urlEsp = url + "/Archivos.php";
  $.post(urlEsp, { dislikes: correo }, function(respuesta)  {
    alert(respuesta);
  });
}



// direccion descripcion fecha contenidos categoria usuario

// https://firebasestorage.googleapis.com/v0/b/click-academy.appspot.com/o/VIDEO%2F2.mp4?alt=media&token=af966cae-4105-4aa5-8d00-b90fad810f86,yeison,pureba2,2019-05-24,1. rueba,Tecnología,yeison ortiz,0,0
