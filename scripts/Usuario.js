//envia una peticion a la base de datos de los archivos que tiene el usuario

obj = { table: "Videos" };
dbParam = JSON.stringify(obj);
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("demo").innerHTML = this.responseText;
  }
};
var url = "https://click-academy.herokuapp.com";
xmlhttp.open("GET", url + "UsuarioArchivo.php?x=" + dbParam, true);
xmlhttp.send();
