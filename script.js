// Eventos para los botones desplegables
document.querySelectorAll('.desplegable').forEach(button => {
    button.addEventListener('click', () => {
        const contenido = button.nextElementSibling;

        // Cerrar todos los demás contenidos
        document.querySelectorAll('.contenido').forEach(otroContenido => {
            if (otroContenido !== contenido && otroContenido.classList.contains('abierto')) {
                otroContenido.classList.remove('abierto');
            }
        });

        // Mostrar u ocultar el contenido actual
        contenido.classList.toggle('abierto');
    });
});

// Modal para mostrar la imagen del producto
const modal = document.getElementById("modal");
const imagenModal = document.getElementById("imagen-modal");

// Obtener todos los productos
const productos = document.querySelectorAll(".producto");

// Agregar evento de clic a cada producto
productos.forEach(producto => {
    producto.addEventListener("click", () => {
        const imagenUrl = producto.getAttribute("data-imagen");
        if (imagenUrl) {
            imagenModal.src = imagenUrl; // Establecer la imagen en el modal
            modal.classList.add("mostrar"); // Mostrar el modal
        } else {
            console.error("No se encontró la imagen para este producto.");
        }
    });
});

// Cerrar el modal al hacer clic en la "X"
const cerrarModal = document.querySelector(".cerrar-modal");
cerrarModal.addEventListener("click", () => {
    modal.classList.remove("mostrar");
});

// Cerrar el modal al hacer clic fuera de la imagen
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("mostrar");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const opcionesEntrega = document.querySelectorAll('input[name="tipo-entrega"]');
    const seccionMesa = document.getElementById("seccion-mesa");
    const seccionDomicilio = document.getElementById("seccion-domicilio");

    opcionesEntrega.forEach((opcion) => {
        opcion.addEventListener("change", function () {
            if (this.value === "mesa") {
                seccionMesa.style.display = "block";
                seccionDomicilio.style.display = "none";
            } else if (this.value === "domicilio") {
                seccionMesa.style.display = "none";
                seccionDomicilio.style.display = "block";
            }
        });
    });
});

// Array para almacenar los productos del pedido
let pedido = [];

// Obtener elementos del DOM
const listaPedido = document.getElementById("lista-pedido");
const totalPedido = document.getElementById("total-pedido");
const enviarPedidoBtn = document.getElementById("enviar-pedido");

// Función para actualizar la lista del pedido
function actualizarPedido() {
    // Limpiar la lista actual
    listaPedido.innerHTML = "";

    // Calcular el total
    let total = 0;

    // Recorrer los productos del pedido y agregarlos a la lista
    pedido.forEach((producto, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button class="eliminar-producto" onclick="eliminarProducto(${index})">
                <i class="fas fa-trash-alt"></i> <!-- Ícono de eliminar -->
            </button>
        `;
        listaPedido.appendChild(li);

        // Sumar al total
        total += producto.precio;
    });

    // Actualizar el total
    totalPedido.textContent = total;
}
// Función para agregar un producto al pedido
document.querySelectorAll(".agregar-pedido").forEach(boton => {
    boton.addEventListener("click", (event) => {
        event.stopPropagation(); // Evitar que el evento se propague al <li>
        const producto = boton.getAttribute("data-producto");
        const precio = parseFloat(boton.getAttribute("data-precio"));

        //console.log("Producto:", producto); // Depuración
        //console.log("Precio:", precio); // Depuración

        // Agregar el producto al array del pedido
        pedido.push({ nombre: producto, precio: precio });

        // Actualizar la lista del pedido
        actualizarPedido();
    });
});

// Función para eliminar un producto del pedido
function eliminarProducto(index) {
    pedido.splice(index, 1); // Eliminar el producto del array
    actualizarPedido(); // Actualizar la lista
}

// Función para enviar el pedido por WhatsApp
enviarPedidoBtn.addEventListener("click", () => {
    const mesa = document.getElementById("mesa").value;

    // Verificar que se haya ingresado un número de mesa
    if (!mesa) {
        alert("Por favor, ingresa el número de mesa.");
        return;
    }

    // Verificar que haya productos en el pedido
    if (pedido.length === 0) {
        alert("Por favor, agrega al menos un producto a tu pedido.");
        return;
    }

    // Crear el mensaje para WhatsApp
    let mensaje = `¡Hola! Soy el cliente de la mesa ${mesa}.\nMi pedido es:\n`;
    pedido.forEach(producto => {
        mensaje += `- ${producto.nombre} - $${producto.precio}\n`;
    });
    mensaje += `Total: $${totalPedido.textContent}\nGracias.`;

    // Codificar el mensaje para la URL de WhatsApp
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Crear el enlace de WhatsApp
    const urlWhatsApp = `https://wa.me/+573218662121?text=${mensajeCodificado}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(urlWhatsApp, "_blank");
});

// Carrusel automático
let slideIndex = 0;

function mostrarSlideManual(index) {
    slideIndex = index;
    actualizarCarrusel();
}

function actualizarCarrusel() {
    const slides = document.querySelectorAll('.slide');
    const indicadores = document.querySelectorAll('.indicador');

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === slideIndex) {
            slide.classList.add('active');
        }
    });

    indicadores.forEach((indicador, i) => {
        indicador.classList.remove('active');
        if (i === slideIndex) {
            indicador.classList.add('active');
        }
    });
}

// Cambiar de slide automáticamente cada 5 segundos
setInterval(() => {
    slideIndex = (slideIndex + 1) % document.querySelectorAll('.slide').length;
    actualizarCarrusel();
}, 5000);