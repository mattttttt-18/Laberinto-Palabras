document.addEventListener('DOMContentLoaded', () => {
    const comenzarBtn = document.getElementById('comenzar-btn');
    const enviarRespuestaBtn = document.getElementById('enviar-respuesta-btn');
    const reiniciarBtn = document.getElementById('reiniciar-btn');
    const pantallas = document.querySelectorAll('.pantalla');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaJuego = document.getElementById('pantalla-juego');
    const pantallaFinal = document.getElementById('pantalla-final');
    const textoGuia = document.getElementById('texto-guia');
    const preguntaContainer = document.getElementById('pregunta-container');
    const preguntaElemento = document.getElementById('pregunta');
    const imagenPregunta = document.getElementById('imagen-pregunta');
    const respuestaInput = document.getElementById('respuesta');
    const mensaje = document.getElementById('mensaje');
    const iconoMensaje = document.getElementById('icono-mensaje');

    let preguntas = [
        { id: 1, pregunta: "¿Cuál es el nombre de este animal?", respuesta: "gato", imagen: "images/gato.png", usada: false },
        { id: 2, pregunta: "¿De qué color es esta fruta?", respuesta: "amarilla", imagen: "images/piña.png", usada: false },
        { id: 3, pregunta: "¿Qué parte del cuerpo es esta?", respuesta: "ojo", imagen: "images/ojo.png", usada: false },
        { id: 4, pregunta: "¿De qué color es el cielo?", respuesta: "azul", imagen: "images/cielo.png", usada: false },
        { id: 5, pregunta: "¿Qué bebida es esta?", respuesta: "leche", imagen: "images/leche.png", usada: false }
    ];
    let problemaActual = null;
    let preguntasResueltas = 0;

    const historia = [
        '¡Bienvenido al laberinto de palabras! Resuelve 5 preguntas para completarlo.',
        '¡Muy bien, ahora hay que resolver la siguiente pregunta!',
        '¡Excelente, ya llevas dos, sigue así!',
        '¡Perfecto, llevas tres, no te detengas!',
        '¡Increíble, sólo falta una más!',
        '🚀 ¡Felicidades, has completado el laberinto! 🚀'
    ];

    comenzarBtn.addEventListener('click', iniciarJuego);
    enviarRespuestaBtn.addEventListener('click', verificarRespuesta);
    reiniciarBtn.addEventListener('click', () => location.reload());

    function iniciarJuego() {
        mostrarPantalla(pantallaJuego);
        mostrarTextoGuia(historia[0]);
        mostrarPregunta();
    }

    function mostrarTextoGuia(texto) {
        textoGuia.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < texto.length) {
                textoGuia.textContent += texto.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                textoGuia.scrollIntoView({ behavior: 'smooth' });
            }
        }, 30);
    }

    function mostrarPregunta() {
        do {
            problemaActual = preguntas[Math.floor(Math.random() * preguntas.length)];
        } while (problemaActual.usada);
        problemaActual.usada = true;

        preguntaElemento.textContent = problemaActual.pregunta;
        imagenPregunta.src = problemaActual.imagen;
        imagenPregunta.classList.remove('oculto');
        respuestaInput.value = '';
        respuestaInput.focus();
        mensaje.textContent = '';
        iconoMensaje.classList.add('oculto');
        preguntaContainer.classList.remove('oculto');
    }

    function verificarRespuesta() {
        const respuesta = respuestaInput.value.trim().toLowerCase();
        if (respuesta === problemaActual.respuesta) {
            mensaje.textContent = '¡Correcto!';
            mensaje.style.color = '#00ff00';
            iconoMensaje.src = 'images/correcto.png';
            iconoMensaje.classList.remove('oculto');
            preguntasResueltas++;
            if (preguntasResueltas < 5) {
                mostrarTextoGuia(historia[preguntasResueltas]);
                setTimeout(mostrarPregunta, 1000);
            } else {
                setTimeout(finalizarJuego, 1000);
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
