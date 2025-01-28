
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

setInterval(() => {
    slideIndex = (slideIndex + 1) % document.querySelectorAll('.slide').length;
    actualizarCarrusel();
}, 5000);

