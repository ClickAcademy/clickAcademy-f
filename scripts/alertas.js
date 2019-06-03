/**
 * Funciones para alertas
 */

function errorModal(error, mensaje) {
  Swal.fire({
    type: "error",
    title: "Oops...",
    text: mensaje,
    footer: error,
    confirmButtonColor: "#00716f"
  });
}

function confirmar(mensaje, confirm) {
  return new Promise(function(resolve, reject) {
    Swal.fire({
      title: mensaje,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00716f",
      cancelButtonColor: "#d33",
      confirmButtonText: confirm,
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        resolve(true);
      } else if (!result.value) {
        reject(false);
      }
    });
  });
}

function successRedirect(mensaje, direccion) {
  Swal.fire({
    type: "success",
    title: mensaje,
    showConfirmButton: true,
    confirmButtonColor: "#00716f"
  }).then(result => {
    if (result.value) {
      window.location.replace(direccion);
    }
  });
}

function success(mensaje) {
  Swal.fire({
    position: "top-end",
    type: "success",
    title: mensaje,
    showConfirmButton: false
  });
}

function alertasPequeñas(mensaje) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000
  });

  Toast.fire({
    type: "success",
    title: mensaje
  });
}

function alertas(mensaje) {
  return new Promise(function(resolve, reject) {
    Swal.fire({
      title: mensaje,
      timer: 1500,
      confirmButtonColor: "#00716f"
    }).then(result => {
      resolve(true);
    });
  });
}

function loader(estado) {
  if (estado === true) {
    swal.showLoading();
  } else if (estado === false) {
    swal.close();
  }
}
