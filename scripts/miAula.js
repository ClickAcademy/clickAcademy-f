$(function() {
  $("#barraMenuSuperior").load("menuSuperior.html");
  $("#barraMenuInferior").load("menuInferior.html");
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      location.replace("index.html");
    } else {
      cargarUsuario(user.email);
      cargarArchivosTodos(user.email);
    }
  });
});

function cargarUsuario(usuario) {
  let urlEsp = url + "/aula.php";
  $.post(urlEsp, { buscarUsuarioPersonal: usuario }, function(respuesta) {
    respuesta = respuesta.split(",");

    respuesta.forEach((element, i) => {
      if (element === " ") {
        respuesta[i] = "No especificado";
      }
    });

    document.title = respuesta[1] + respuesta[2];
    let titulonode = document.createTextNode(respuesta[1] + respuesta[2]);
    document.getElementById("nombreUsuario").appendChild(titulonode);
    document.getElementById("nombreUsuarioTab").value = respuesta[1].trim();
    document.getElementById("apellidoUsuarioTab").value = respuesta[2].trim();
    document.getElementById("generoUsuarioTab").value = respuesta[3];
    document.getElementById("nacimientoUsuarioTab").value = respuesta[4];
    document.getElementById("paisUsuarioTab").value = respuesta[5];
    document.getElementById("ciudadUsuarioTab").value = respuesta[6];
  });
}

function cargarArchivosTodos(usuario) {
  let urlEsp = url + "/Archivos.php";
  $.post(urlEsp, { buscarArchivosUsuario: usuario }, function(respuesta) {});
}
