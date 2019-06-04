$(function() {
  $("#barraMenuSuperior").load("menuSuperior.html");
  $("#barraMenuInferior").load("menuInferior.html");
  cargarArchivos();
});

function cargarArchivos() {
  let urlEsp = url + "/Archivos.php";
  $.post(urlEsp, { tipoCarga: "Todo" }, function(respuesta) {
    let funciones = respuesta.split("}{");
    let archivos = new Array();
    funciones.forEach(element => {
      archivos.push(element.split("¬¬"));
    });
    archivos.forEach(element => {
      cargarElementos(element);
    });
  });
}

function cargarElementos(elemento) {
  let divElemento = document.createElement("DIV");
  divElemento.className = "CategoriasMostrar";
  let divCategoriaElemento = document.createElement("DIV");
  divCategoriaElemento.className = "ArchivosCategoria";
  let h1 = document.createElement("H1");
  let categoria = elemento[0];
  let titulo = document.createTextNode(categoria);
  h1.appendChild(titulo);
  elemento.shift();
  let archivos = new Array();

  elemento.forEach(element => {
    archivos = element.split(" }*@{ ");

    let divMiniatura = document.createElement("DIV");
    divMiniatura.className = "MiniaturaArchivos";

    let tituloMiniatura = document.createTextNode(archivos[1]);

    let h2 = document.createElement("H2");

    h2.appendChild(tituloMiniatura);

    let preview = document.createElement("DIV");
    preview.className = "ImgMiniatura";

    divMiniatura.appendChild(h2);
    divMiniatura.appendChild(preview);
    divMiniatura.setAttribute("data", archivos[0]);
    divMiniatura.setAttribute("category", categoria);
    divMiniatura.onclick = function() {
      let cat = divMiniatura.getAttribute("category").trim();
      switch (cat) {
        case "Usuarios":
          window.location.href =
            "./aula.html?" + divMiniatura.getAttribute("data").trim();
          break;
        case "Nuevos":
          window.location.href =
            "./archivo.html?" + divMiniatura.getAttribute("data").trim();
          break;
        case "Random":
          window.location.href =
            "./archivo.html?" + divMiniatura.getAttribute("data").trim();
          break;
        case "Favoritos":
          window.location.href =
            "./archivo.html?" + divMiniatura.getAttribute("data").trim();
          break;
      }
    };

    divCategoriaElemento.appendChild(divMiniatura);

    switch (categoria) {
      case "Random":
        preview.id = "miniaturaRandomTodos";
        miniatura(preview);
        break;
      case "Usuarios ":
        preview.id = "miniaturaUsuarios";
        let imagen = document.createElement("img");
        imagen.setAttribute("src", archivos[2]);
        preview.appendChild(imagen);
        break;
      case "Nuevos":
        preview.id = "miniaturaNuevosTodos";
        miniatura(preview);
        break;
      case "Favoritos":
        preview.id = "miniaturaLikesTodos";
        miniatura(preview);
        break;
    }
    function miniatura(preview) {
      let archivo = archivos[3].trim();

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
  });

  divElemento.appendChild(h1);
  divElemento.appendChild(divCategoriaElemento);
  document.getElementById("contenido").appendChild(divElemento);
}
