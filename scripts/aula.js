$(function() {
  $("#barraMenuSuperior").load("menuSuperior.html");
  $("#barraMenuInferior").load("menuInferior.html");

  let usuario = window.location.href;
  usuario = usuario.split("?");

  cargarUsuario(usuario[1]);
  cargarArchivos(usuario[1], "Todos")
    .then(response => {
      establecerMiniaturas(response, "tab-0");
    })
    .catch(errt => {
      let msg = document.createTextNode(errt);
      let hm = document.createElement("h2");
      hm.appendChild(msg);
      document.getElementById("tab-0").appendChild(hm);
    });
  cargarArchivos(usuario[1], "Videos")
    .then(response => {
      establecerMiniaturas(response, "tab-1");
    })
    .catch(errv => {
      let msg = document.createTextNode(errv);
      let hm = document.createElement("h2");
      hm.appendChild(msg);
      document.getElementById("tab-1").appendChild(hm);
    });
  cargarArchivos(usuario[1], "Imagenes")
    .then(response => {
      establecerMiniaturas(response, "tab-2");
    })
    .catch(erri => {
      let msg = document.createTextNode(erri);
      let hm = document.createElement("h2");
      hm.appendChild(msg);
      document.getElementById("tab-2").appendChild(hm);
    });
  cargarArchivos(usuario[1], "Documentos")
    .then(response => {
      establecerMiniaturas(response, "tab-3");
    })
    .catch(errd => {
      let msg = document.createTextNode(errd);
      let hm = document.createElement("h2");
      hm.appendChild(msg);
      document.getElementById("tab-3").appendChild(hm);
    });
  cargarArchivos(usuario[1], "Presentaciones")
    .then(response => {
      establecerMiniaturas(response, "tab-4");
    })
    .catch(errp => {
      let msg = document.createTextNode(errp);
      let hm = document.createElement("h2");
      hm.appendChild(msg);
      document.getElementById("tab-4").appendChild(hm);
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
  $.post(urlEsp, { buscarUsuario: usuario }, function(respuesta) {
    respuesta = respuesta.split(",");
    respuesta.forEach((element, i) => {
      if (element === " ") {
        respuesta[i] = "No especificado";
      }
    });
    document.title = respuesta[1] + respuesta[2];
    let titulonode = document.createTextNode(respuesta[1] + respuesta[2]);
    document.getElementById("nombreUsuario").appendChild(titulonode);
    document.getElementById("generoUsuarioTab").value = respuesta[3];
    document
      .getElementById("profile_picture")
      .setAttribute("src", respuesta[6]);
    document.getElementById("paisUsuarioTab").value = respuesta[7];
    document.getElementById("ciudadUsuarioTab").value = respuesta[8];
  });
}

function establecerMiniaturas(archivos, tab) {
  let elemento = archivos.split("}@{");
  elemento.splice(0, 1);

  let divCategoriaElemento = document.createElement("DIV");
  divCategoriaElemento.className = "ArchivosCategoria";

  let divcontenido = document.createElement("DIV");
  divcontenido.setAttribute("id", "divContenido");
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

    divcontenido.appendChild(divMiniatura);
  });

  divCategoriaElemento.appendChild(divcontenido);
  document.getElementById(tab).appendChild(divCategoriaElemento);
}

function cargarArchivos(usuario, categoria) {
  return new Promise(function(resolve, reject) {
    let urlEsp = url + "/aula.php";
    switch (categoria) {
      case "Todos":
        $.post(urlEsp, { buscarArchivosUsuarioExternoTodos: usuario }, function(
          respuesta
        ) {
          if (respuesta.trim() === "") {
            reject("Ups, no hemos encontrado archivos en esta aula");
          } else {
            resolve(respuesta);
          }
        });
        break;
      case "Videos":
        $.post(
          urlEsp,
          { buscarArchivosUsuarioExternoVideos: usuario },
          function(respuesta) {
            if (respuesta.trim() == "") {
              reject("Ups, no hemos encontrado videos en esta aula");
            } else {
              resolve(respuesta);
            }
          }
        );
        break;
      case "Imagenes":
        $.post(
          urlEsp,
          { buscarArchivosUsuarioExternoImagenes: usuario },
          function(respuesta) {
            if (respuesta.trim() == "") {
              reject("Ups, no hemos encontrado imágenes en esta aula");
            } else {
              resolve(respuesta);
            }
          }
        );
        break;
      case "Presentaciones":
        $.post(
          urlEsp,
          { buscarArchivosUsuarioExternoPresentaciones: usuario },
          function(respuesta) {
            if (respuesta.trim() == "") {
              reject("Ups, no hemos encontrado presentaciones en esta aula");
            } else {
              resolve(respuesta);
            }
          }
        );
        break;
      case "Documentos":
        $.post(
          urlEsp,
          { buscarArchivosUsuarioExternoDocumentos: usuario },
          function(respuesta) {
            if (respuesta.trim() == "") {
              reject("Ups, no hemos encontrado documentos en esta aula");
            } else {
              resolve(respuesta);
            }
          }
        );
        break;
    }
  });
}
