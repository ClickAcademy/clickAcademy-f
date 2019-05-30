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
    // window.history.pushState("", respuesta[1], archivo[0] +"/"+respuesta[1]+"/");
    visualizar("Presentación", respuesta[0]);
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
            "http://docs.google.com/gview?url=" + response + "&embedded=true";
          document.getElementById("DOC").style.display = "block";
        })
        .catch(error => {
          errorModal(error, "No se ha podido mostrar el archivo");
        });
      break;
    case "Presentación":
      alert(archivo);
      ArreglarUrl(archivo)
        .then(response => {
          let doc = document.getElementById("DOC");
          doc.src =
            // "http://docs.google.com/gview?url=" + response + "&embedded=true";
            "http://view.officeapps.live.com/op/view.aspx?src=" +
            response +
            "&embedded=true";
          document.getElementById("DOC").style.display = "block";
        })
        .catch(error => {
          errorModal(error, "No se ha podido mostrar el archivo");
        });
      break;
    case "PDF":
      let pdf = document.getElementById("DocPre");
      $("#DocPre").attr("src", archivo);
      pdf.style.display = "block";
      break;
    case "Imagen":
      $("#Img").attr("src", pdffile_url);
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
// direccion descripcion fecha contenidos categoria usuario

// https://firebasestorage.googleapis.com/v0/b/click-academy.appspot.com/o/VIDEO%2F2.mp4?alt=media&token=af966cae-4105-4aa5-8d00-b90fad810f86,yeison,pureba2,2019-05-24,1. rueba,Tecnología,yeison ortiz,0,0
