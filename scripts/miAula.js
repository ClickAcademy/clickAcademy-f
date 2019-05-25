$(function() {
  $("#barraMenuSuperior").load("menuSuperior.html");
  $("#barraMenuInferior").load("menuInferior.html");
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      location.replace("index.html");
    } else {
      document.title = user.email;
    }
  });
});

function aulaUsuario() {
  return new Promise(function(resolve, reject) {
    let urlEsp = url + "/Aula.php";
    $.post(
      urlEsp, 
      {infoUsuarioP: "todopersonal"},
      function(respuesta){
        if(respuesta==="0"){
          reject("No se ha podido cargar información");
        }else{
          resolve(respuesta);
        }
      }
    );
  });
}
