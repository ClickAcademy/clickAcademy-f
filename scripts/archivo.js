$(function() {
  $("#barraMenuSuperior").load("menuSuperior.html");
  $("#barraMenuInferior").load("menuInferior.html");
  display();
});

function display() {
  let archivo = window.location.href;
  archivo = archivo.split("=");
  let urlEsp = url + "/Archivos.php";
  $.post(urlEsp, { buscarArchivo: archivo[1] }, function(respuesta) {
    respuesta = respuesta.split(", ");


    document.title = respuesta[1];
    let titulo = document.createElement("P");
    let titulonode= document.createTextNode(respuesta[1]);
    titulo.appendChild(titulonode);
    document.getElementById("titulo").appendChild(titulo);

    
  });
}

// direccion descripcion fecha contenidos categoria usuario

// https://firebasestorage.googleapis.com/v0/b/click-academy.appspot.com/o/GuiaLaboratorioManuallaboratoriofisica.pdf?alt=media&token=53ff0cb6-61a5-44b5-b077-824d1e4a91aa, yeison, prueba2, 2019-05-22, prueba2, Tecnología, yeison ortiz¬¬ 0¬¬ 0

