$(function() {
  $("#barraMenuSuperior").load("menuSuperior.html");
  $("#barraMenuInferior").load("menuInferior.html");
  busquedaBD();
});

function busquedaBD() {
  let parametro = window.location.href;
  parametro = parametro.split("?");
  let urlEsp = url + "/Archivos.php";
  $.post(urlEsp, { textoBusqueda: parametro[1] }, function(respuesta) {
    if (respuesta == "0") {
      alertas("No hemos encontrado coincidencias");
    } else {
      establecerMiniaturas(respuesta);
    }
  });
}

function establecerMiniaturas(archivos) {
  let elemento = archivos.split(" ]@*[ ");
  elemento.splice(0, 1);

  let divCategoriaElemento = document.createElement("DIV");
  divCategoriaElemento.className = "ArchivosCategoria";
  let archive = new Array();

  elemento.forEach(element => {
    archive = element.split(" }@*{ ");

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

    divCategoriaElemento.appendChild(divMiniatura);
  });
  document.getElementById("contenido").appendChild(divCategoriaElemento);

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
}
