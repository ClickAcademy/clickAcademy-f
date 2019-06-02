$(function() {
  $("#barraMenuSuperior").load("menuSuperior.html");
  $("#barraMenuInferior").load("menuInferior.html");
  cargarArchivos();
});

function cargarArchivos() {
    let urlEsp = url + "/Archivos.php";
    $.post(urlEsp, { tipoCarga: "Documentos" }, function(respuesta) {
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
      archivos = element.split(",");
  
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
        }
      };
  
      divCategoriaElemento.appendChild(divMiniatura);
  
      switch (categoria) {
        case "Random":
          preview.id = "miniaturaRandomTodos";
          break;
        case "Usuarios ":
          preview.id = "miniaturaUsuarios";
          break;
        case "Nuevos":
          preview.id = "miniaturaNuevosTodos";
          break;
        case "Más likes":
          preview.id = "miniaturaLikesTodos";
          break;
      }
    });
  
    divElemento.appendChild(h1);
    divElemento.appendChild(divCategoriaElemento);
    document.getElementById("contenido").appendChild(divElemento);
  }
  