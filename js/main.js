// Variables
const juguetes = [
    {
        id: 1,
        nombre: 'Balancín',
        precio: 4900,
        imagen: './assets/balancin.jpg'
    },
    {
        id: 2,
        nombre: 'Bloques',
        precio: 1000,
        imagen: './assets/bloques.jpg'
    },
    {
        id: 3,
        nombre: 'Cometa de mano',
        precio: 400,
        imagen: './assets/cometaMano.JPG'
    },
    {
        id: 4,
        nombre: 'Cubo didáctico',
        precio: 2000,
        imagen: './assets/cubo.JPG'
    },
    {
        id: 5,
        nombre: 'Enhebrados',
        precio: 1500,
        imagen: './assets/enhebrado.jpg'
    },
    {
        id: 6,
        nombre: 'Rompecabezas',
        precio: 1000,
        imagen: './assets/rompecabezas.JPG'
    },
    {
        id: 7,
        nombre: 'Sonajero',
        precio: 450,
        imagen: './assets/sonajero.JPG'
    },
    {
        id: 8,
        nombre: 'Tablero didáctico',
        precio: 2000,
        imagen: './assets/tablero.JPG'
    },
    {
        id: 9,
        nombre: 'Torre de encastre',
        precio: 2300,
        imagen: './assets/torre.jpg'
    }
];

let carrito = [];
let total = 0;
const items1 = document.getElementById('items');
const carrito1 = document.getElementById('carrito');
const total1 = document.getElementById('total');
const botonVaciar = document.getElementById('boton-vaciar');

// Funciones

function renderizarProductos() {
    juguetes.forEach((producto) => {
        // Armar estructura cards
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const tituloCard = document.createElement('h5');
        tituloCard.classList.add('card-title');
        tituloCard.textContent = producto.nombre;
        const imgCard = document.createElement('img');
        imgCard.classList.add('img-fluid');
        imgCard.setAttribute('src', producto.imagen);
        const precioCard = document.createElement('p');
        precioCard.classList.add('card-text');
        precioCard.textContent = "$" + producto.precio;
        const botonCard = document.createElement('button');
        botonCard.classList.add('btn', 'btn-info');
        botonCard.textContent = 'Añadir a carrito';
        botonCard.setAttribute('marcador', producto.id);
        botonCard.addEventListener('click', añadirProducto);
        cardBody.appendChild(imgCard);
        cardBody.appendChild(tituloCard);
        cardBody.appendChild(precioCard);
        cardBody.appendChild(botonCard);
        miNodo.appendChild(cardBody);
        items1.appendChild(miNodo);
    });
}

function añadirProducto(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    calcularTotal();
    renderizarCarrito();

}

function renderizarCarrito() {
    carrito1.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = juguetes.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $ ${miItem[0].precio}`;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        carrito1.appendChild(miNodo);
    });
}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
    calcularTotal();
}


function calcularTotal() {
    total = 0;
    carrito.forEach((item) => {
        const miItem = juguetes.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });
    total1.textContent = total.toFixed(2);
}


function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
    calcularTotal();
}

const almacenarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor)
};

almacenarLocal("listaJuguetes", JSON.stringify(juguetes));

function iniciarMap(){
    var coord = {lat: -31.4551673 ,lng: -64.203341};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}

// Eventos

botonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();