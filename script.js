document.addEventListener('DOMContentLoaded', () => {
    const comenzarBtn = document.getElementById('comenzar-btn');
    const reiniciarBtn = document.getElementById('reiniciar-btn');
    const opcionBtns = document.querySelectorAll('.opcion-btn');
    const pantallas = document.querySelectorAll('.pantalla');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaJuego = document.getElementById('pantalla-juego');
    const pantallaFinal = document.getElementById('pantalla-final');
    const textoGuia = document.getElementById('texto-guia');
    const preguntaContainer = document.getElementById('pregunta-container');
    const preguntaElemento = document.getElementById('pregunta');
    const imagenPregunta = document.getElementById('imagen-pregunta');
    const mensaje = document.getElementById('mensaje');
    const iconoMensaje = document.getElementById('icono-mensaje');

    let preguntas = [
        { id: 1, pregunta: "¿Cuál es el nombre de este animal?", opciones: ["Gato", "Perro", "Ratón"], correcta: "Gato", imagen: "images/gato.png", usada: false },
        { id: 2, pregunta: "¿De qué color es esta fruta?", opciones: ["Roja", "Amarilla", "Verde"], correcta: "Amarilla", imagen: "images/piña.png", usada: false },
        { id: 3, pregunta: "¿Qué parte del cuerpo es esta?", opciones: ["Ojo", "Oreja", "Boca"], correcta: "Ojo", imagen: "images/ojo.png", usada: false },
        { id: 4, pregunta: "¿De qué color es el cielo?", opciones: ["Rojo", "Azul", "Negro"], correcta: "Azul", imagen: "images/cielo.png", usada: false },
        { id: 5, pregunta: "¿Qué bebida es esta?", opciones: ["Agua", "Leche", "Jugo"], correcta: "Leche", imagen: "images/leche.png", usada: false }
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
    reiniciarBtn.addEventListener('click', () => location.reload());
    opcionBtns.forEach(btn => btn.addEventListener('click', verificarRespuesta));

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
        opcionBtns.forEach((btn, index) => {
            btn.textContent = problemaActual.opciones[index];
        });
        mensaje.textContent = '';
        iconoMensaje.classList.add('oculto');
        preguntaContainer.classList.remove('oculto');
    }

    function verificarRespuesta(event) {
        const respuesta = event.target.textContent;
        if (respuesta === problemaActual.correcta) {
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
