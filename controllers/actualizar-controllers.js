import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInformacion = async () => {
  //Con async creamos una funcion "await".
  const url = new URL(window.location);
  const id = url.searchParams.get("id"); //Esto busca el parametro id que agregamos en la url del html de editar_cliente.

  if (id === null) {
    window.location.href = "../screens/error.html";
  }

  const nombre = document.querySelector("[data-nombre]");
  const email = document.querySelector("[data-email]");

  try {
    const perfil = await clientServices.detalleCliente(id); //De esta forma esperamos la respuesta del servidor y obtener la respuesta.
    if (perfil.nombre && perfil.email) {
      //Para obtener los datos del cliente.
      nombre.value = perfil.nombre;
      email.value = perfil.email;
    } else {
      throw new Error();
    }
  } catch (error) {
    window.location.href = '../screens/error.html';
  }
};

obtenerInformacion();

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  const nombre = document.querySelector("[data-nombre]").value;
  const email = document.querySelector("[data-email]").value;
  console.log(nombre, email);
  clientServices.actualizarCliente(nombre, email, id).then(() => {
    window.location.href = "../screens/edicion_concluida.html";
  });
});
