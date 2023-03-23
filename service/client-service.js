

//Abrir http (metodo, url)

// CRUD    -   Metodos HTTP
//Create   -   POST
//Read     -   GET
//Update   -   PUT / PATCH
//Delete   -   DELETE


// LA FORMA ANTIGUA DE HACERLO
// const listaClientes = () => {
//   const promise = new Promise((resolve, reject) => {
//     //Generar una Promise
//     const http = new XMLHttpRequest();                //lograr la coneccion con nuestro API
//     http.open("GET", "http://localhost:3000/perfil"); //con GET decimos cual es la url

//     //Enviar la peticion
//     http.send();

//     //Recibir respuesta
//     http.onload = () => {
//       const response = JSON.parse(http.response); //para poder obtener un objeto de la peticion
//       if (http.status >= 400) {                   //verificar el status de la llamada
//         reject(response);                         //nos dice que hubo un error
//       } else {
//         resolve(response)
//       }
//     };
//   });
//   return promise;
// };

//LA NUEVA FORMA POR UNA FUNCION YA CREADA EN EL NAVEGADOR
//  fetch API
// const listaClientes = () => {
  // return fetch('http://localhost:3000/perfil').then(respuesta => {  //De esta forma fetch toma automaticamente metodo GET.
  //   return respuesta.json(); //A mi respuesta dale formato de .json
  // });
  //EL CODIGO ANTERIOR EN UNA LINEA
const listaClientes = () => fetch('http://localhost:3000/perfil').then(respuesta => respuesta.json());
// }

const crearCliente = (nombre, email) => {
  return fetch('http://localhost:3000/perfil', {
    method: 'POST',                      //Para definir el metodo a POST.
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({nombre,email, id: uuid.v4()}) //Para transformarlo en texto. El tercer parametro es de la libreria "uuid cdn".
  })
}

const eliminarCliente = (id) => {
  return fetch(`http://localhost:3000/perfil/${id}`, {
    method: 'DELETE',
  })
}

const detalleCliente = (id) => {
  return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta) => respuesta.json());//respuesta.json para q lo devuelva como objeto.
}

const actualizarCliente = (nombre,email,id) => {
  return fetch(`http://localhost:3000/perfil/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({nombre,email})
  }).then(respuesta => console.log(respuesta)).catch((err) => console.log(err));
}

export const clientServices = {
  listaClientes,
  crearCliente,
  eliminarCliente,
  detalleCliente,
  actualizarCliente,
}