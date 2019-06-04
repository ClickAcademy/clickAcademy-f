$(function() {
  $("#barraMenuSuperior").load("menuSuperior.html");
  $("#barraMenuInferior").load("menuInferior.html");
  $("#cambiosFotos").attr("disabled", true);
  $("#cancelarFotos").attr("disabled", true);
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      location.replace("index.html");
    } else {
      $("#profile_picture").attr("src", user.photoURL);
      $("#perfilCambio").attr("src", user.photoURL);
      cargarUsuario(user.email);
      cargarArchivos(user.email, "Todos")
        .then(response => {
          establecerMiniaturas(response, "tab-0");
        })
        .catch(errt => {
          let msg = document.createTextNode(errt);
          let hm = document.createElement("h2");
          hm.appendChild(msg);
          document.getElementById("tab-0").appendChild(hm);
        });
      cargarArchivos(user.email, "Videos")
        .then(response => {
          establecerMiniaturas(response, "tab-1");
        })
        .catch(errv => {
          let msg = document.createTextNode(errv);
          let hm = document.createElement("h2");
          hm.appendChild(msg);
          document.getElementById("tab-1").appendChild(hm);
        });
      cargarArchivos(user.email, "Imagenes")
        .then(response => {
          establecerMiniaturas(response, "tab-2");
        })
        .catch(erri => {
          let msg = document.createTextNode(erri);
          let hm = document.createElement("h2");
          hm.appendChild(msg);
          document.getElementById("tab-2").appendChild(hm);
        });
      cargarArchivos(user.email, "Documentos")
        .then(response => {
          establecerMiniaturas(response, "tab-3");
        })
        .catch(errc => {
          let msg = document.createTextNode(errc);
          let hm = document.createElement("h2");
          hm.appendChild(msg);
          document.getElementById("tab-3").appendChild(hm);
        });
      cargarArchivos(user.email, "Presentaciones")
        .then(response => {
          establecerMiniaturas(response, "tab-4");
        })
        .catch(errp => {
          let msg = document.createTextNode(errp);
          let hm = document.createElement("h2");
          hm.appendChild(msg);
          document.getElementById("tab-4").appendChild(hm);
        });
    }
  });
});

$(document).ready(function() {
  if (
    $("#botonTodos").on("click", function() {
      ocultarPaneles();
      $("#tab-0").show();
    })
  );
  if (
    $("#botonVideos").on("click", function() {
      ocultarPaneles();
      $("#tab-1").show();
    })
  );
  if (
    $("#botonImagenes").on("click", function() {
      ocultarPaneles();
      $("#tab-2").show();
    })
  );
  if (
    $("#botonDocumentos").on("click", function() {
      ocultarPaneles();
      $("#tab-3").show();
    })
  );
  if (
    $("#botonPresentaciones").on("click", function() {
      ocultarPaneles();
      $("#tab-4").show();
    })
  );
  if (
    $("#botonInformacion").on("click", function() {
      ocultarPaneles();
      $("#tab-5").show();
    })
  );
});

function ocultarPaneles() {
  document.getElementById("tab-0").style.display = "none";
  document.getElementById("tab-1").style.display = "none";
  document.getElementById("tab-2").style.display = "none";
  document.getElementById("tab-3").style.display = "none";
  document.getElementById("tab-4").style.display = "none";
  document.getElementById("tab-5").style.display = "none";
}

function cargarUsuario(usuario) {
  let urlEsp = url + "/aula.php";
  $.post(urlEsp, { buscarUsuarioPersonal: usuario }, function(respuesta) {
    respuesta = respuesta.split(",");

    respuesta.forEach((element, i) => {
      if (element === " ") {
        respuesta[i] = "No especificado";
      }
    });

    document.getElementById("nombreUsuario").innerHTML = "";
    document.title = respuesta[1] + respuesta[2];
    let titulonode = document.createTextNode(respuesta[1] + respuesta[2]);
    document.getElementById("nombreUsuario").appendChild(titulonode);
    document.getElementById("nombreUsuarioTab").value = respuesta[1].trim();
    document.getElementById("apellidoUsuarioTab").value = respuesta[2].trim();
    document.getElementById("generoUsuarioTab").value = respuesta[3];
    document.getElementById("paisUsuarioTab").value = respuesta[7];
    document.getElementById("ciudadUsuarioTab").value = respuesta[8];
  });
}

function establecerMiniaturas(archivos, tab) {
  let elemento = archivos.split("}@{");
  elemento.splice(0, 1);

  let divCategoriaElemento = document.createElement("DIV");
  divCategoriaElemento.className = "ArchivosCategoria";
  let archive = new Array();

  elemento.forEach(element => {
    archive = element.split("}*{");

    let divMiniatura = document.createElement("DIV");
    divMiniatura.className = "MiniaturaArchivos";

    let tituloMiniatura = document.createTextNode(archive[1]);

    let h2 = document.createElement("H2");

    h2.appendChild(tituloMiniatura);

    let preview = document.createElement("DIV");
    preview.className = "ImgMiniatura";
    miniatura(preview, archive[2]);

    divMiniatura.appendChild(h2);
    divMiniatura.appendChild(preview);
    divMiniatura.setAttribute("data", archive[0]);
    divMiniatura.onclick = function() {
      window.location.href =
        "./archivo.html?" + divMiniatura.getAttribute("data").trim();
    };

    function miniatura(preview, archivo) {
      if (archivo === "TA-5ce165c476dfc7.01202288") {
        let p = document.createElement("i");
        p.setAttribute("class", "fas fa-file-video");
        p.setAttribute("id", "iconoImagen");
        preview.appendChild(p);
      }

      if (archivo === "TA-5c3f65c476ecc7.01202468") {
        let p = document.createElement("i");
        p.setAttribute("class", "fas fa-file-word");
        p.setAttribute("id", "iconoImagen");
        preview.appendChild(p);
      }

      if (archivo === "TA-4ad165c476ecc7.01202288") {
        let p = document.createElement("i");
        p.setAttribute("class", "fas fa-file-image");
        p.setAttribute("id", "iconoImagen");
        preview.appendChild(p);
      }

      if (archivo === "TA-6cb165c476ecc7.01202288") {
        let p = document.createElement("i");
        p.setAttribute("class", "fas fa-file-powerpoint");
        p.setAttribute("id", "iconoImagen");
        preview.appendChild(p);
      }

      if (archivo === "TA-6fa345c476ecc7.01202288") {
        let p = document.createElement("i");
        p.setAttribute("class", "fas fa-file-pdf");
        p.setAttribute("id", "iconoImagen");
        preview.appendChild(p);
      }
    }

    divCategoriaElemento.appendChild(divMiniatura);
  });
  document.getElementById(tab).appendChild(divCategoriaElemento);
}

function cargarArchivos(usuario, categoria) {
  return new Promise(function(resolve, reject) {
    let urlEsp = url + "/aula.php";
    switch (categoria) {
      case "Todos":
        $.post(urlEsp, { buscarArchivosUsuarioTodos: usuario }, function(
          respuesta
        ) {
          if (respuesta.trim() == "") {
            reject("Parece que no has compartido ningún archivo");
          } else {
            resolve(respuesta);
          }
        });
        break;
      case "Videos":
        $.post(urlEsp, { buscarArchivosUsuarioVideos: usuario }, function(
          respuesta
        ) {
          if (respuesta.trim() == "") {
            reject("Parece que no has compartido ningún video");
          } else {
            resolve(respuesta);
          }
        });
        break;
      case "Imagenes":
        $.post(urlEsp, { buscarArchivosUsuarioImagenes: usuario }, function(
          respuesta
        ) {
          if (respuesta.trim() == "") {
            reject("Parece que no has compartido ninguna imagen");
          } else {
            resolve(respuesta);
          }
        });
        break;
      case "Presentaciones":
        $.post(
          urlEsp,
          { buscarArchivosUsuarioPresentaciones: usuario },
          function(respuesta) {
            if (respuesta.trim() == "") {
              reject("Parece que no has compartido ninguna presentación");
            } else {
              resolve(respuesta);
            }
          }
        );
        break;
      case "Documentos":
        $.post(urlEsp, { buscarArchivosUsuarioDocumentos: usuario }, function(
          respuesta
        ) {
          if (respuesta.trim() == "") {
            reject("Parece que no has compartido ningún documento");
          } else {
            resolve(respuesta);
          }
        });
        break;
    }
  });
}
