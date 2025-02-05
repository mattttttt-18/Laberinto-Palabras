document.addEventListener('DOMContentLoaded', () => {
    const comenzarBtn = document.getElementById('comenzar-btn');
    const enviarRespuestaBtn = document.getElementById('enviar-respuesta-btn');
    const reiniciarBtn = document.getElementById('reiniciar-btn');
    const pantallas = document.querySelectorAll('.pantalla');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaJuego = document.getElementById('pantalla-juego');
    const pantallaFinal = document.getElementById('pantalla-final');
    const preguntaContainer = document.getElementById('pregunta-container');
    const preguntaElemento = document.getElementById('pregunta');
    const imagenPregunta = document.getElementById('imagen-pregunta');
    const respuestaInput = document.getElementById('respuesta');
    const mensaje = document.getElementById('mensaje');
    const iconoMensaje = document.getElementById('icono-mensaje');
    
    let preguntas = [
        { pregunta: "¿Cuál es el nombre de este animal?", respuesta: "gato", imagen: "images/gato.png" },
        { pregunta: "¿De qué color es esta fruta?", respuesta: "amarilla", imagen: "images/piña.png" },
        { pregunta: "¿Qué parte del cuerpo es esta?", respuesta: "ojo", imagen: "images/ojo.png" },
        { pregunta: "¿De qué color es el cielo?", respuesta: "azul", imagen: "images/cielo.png" },
        { pregunta: "¿Qué bebida es esta?", respuesta: "leche", imagen: "images/leche.png" }
    ];
    let preguntaActual = 0;

    comenzarBtn.addEventListener('click', iniciarJuego);
    enviarRespuestaBtn.addEventListener('click', verificarRespuesta);
    reiniciarBtn.addEventListener('click', () => location.reload());

    function iniciarJuego() {
        mostrarPantalla(pantallaJuego);
        mostrarPregunta();
    }

    function mostrarPregunta() {
        const pregunta = preguntas[preguntaActual];
        preguntaElemento.textContent = pregunta.pregunta;
        imagenPregunta.src = pregunta.imagen;
        imagenPregunta.classList.remove('oculto');
        respuestaInput.value = '';
        respuestaInput.focus();
        mensaje.textContent = '';
        iconoMensaje.classList.add('oculto');
        preguntaContainer.classList.remove('oculto');
    }

    function verificarRespuesta() {
        const respuesta = respuestaInput.value.trim().toLowerCase();
        if (respuesta === preguntas[preguntaActual].respuesta) {
            mensaje.textContent = '¡Correcto!';
            mensaje.style.color = '#00ff00';
            iconoMensaje.src = 'images/correcto.png';
            iconoMensaje.classList.remove('oculto');
            preguntaActual++;
            if (preguntaActual >= preguntas.length) {
                setTimeout(finalizarJuego, 1000);
            } else {
                setTimeout(mostrarPregunta, 1000);
            }
        } else {
            mensaje.textContent = 'Incorrecto. Inténtalo de nuevo.';
            mensaje.style.color = '#ff4500';
            iconoMensaje.src = 'images/incorrecto.png';
            iconoMensaje.classList.remove('oculto');
        }
    }

    function finalizarJuego() {
        mostrarPantalla(pantallaFinal);
    }

    function mostrarPantalla(pantalla) {
        pantallas.forEach(p => p.classList.remove('activa'));
        pantalla.classList.add('activa');
    }

    // Iniciar en pantalla inicial
    mostrarPantalla(pantallaInicial);
});
