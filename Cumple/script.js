const boton = document.getElementById("botonSorpresa");
const sorpresa = document.getElementById("sorpresa");

const sobreCarta = document.getElementById("sobreCarta");
const carta = document.getElementById("carta");


/* =================================
   BOTÓN DE SORPRESA
================================= */

boton.addEventListener("click", () => {

    sorpresa.scrollIntoView({
        behavior: "smooth"
    });

});


/* =================================
   ABRIR CARTA
================================= */

function abrirCarta() {

    // abre carta una vez y la maneja abierta
    if (sobreCarta.classList.contains("abierto")) {
        return;
    }

    // Abrimos el sobre
    sobreCarta.classList.add("abierto");

    // Después de que se abra la solapa,
    // mostramos la carta
    setTimeout(() => {

        carta.classList.add("mostrar");

        // Llevar suavemente hacia la carta
        setTimeout(() => {

            carta.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 500);

    }, 900);

}


/* Click en el sobre */

sobreCarta.addEventListener("click", abrirCarta);


/* =================================
   ABRIR CON TECLADO
================================= */

sobreCarta.addEventListener("keydown", (evento) => {

    if (
        evento.key === "Enter" ||
        evento.key === " "
    ) {

        evento.preventDefault();

        abrirCarta();

    }

});


/* =================================
   CORAZONES FLOTANDO
================================= */

const contenedorCorazones =
    document.querySelector(".corazones");


function crearCorazon() {

    const corazon =
        document.createElement("div");

    corazon.classList.add("corazon");


    const corazones = [
        "❤️",
        "✨",
        "💗",
        "💖",
        "🐥",
        "🌷"
    ];


    corazon.textContent =
        corazones[
            Math.floor(
                Math.random() * corazones.length
            )
        ];


    corazon.style.left =
        Math.random() * 100 + "vw";


    corazon.style.fontSize =
        (Math.random() * 15 + 15) + "px";


    corazon.style.animationDuration =
        (Math.random() * 4 + 4) + "s";


    contenedorCorazones.appendChild(
        corazon
    );


    setTimeout(() => {

        corazon.remove();

    }, 8000);

}


setInterval(crearCorazon, 700);
/* Nuevas escenas: se animan cuando entran en pantalla. */
const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');
const escenaMariposas = document.querySelector('.corazon-mariposas');
for (let i = 0; i < 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    const x = 50 + 2.7 * 16 * Math.pow(Math.sin(t), 3);
    const y = 46 - 2.65 * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    const mariposa = document.createElement('span');
    mariposa.className = 'mariposa';
    mariposa.style.cssText = `--x:${x}%;--y:${y}%;--dx:${Math.cos(t*3)*380}px;--dy:${Math.sin(t*2)*290}px;--giro:${i%2 ? 130 : -130}deg;--espera:${(i%9)*.12}s`;
    const alas = document.createElement('span');
    alas.className = 'alas';
    alas.textContent = '🦋';
    mariposa.appendChild(alas);
    escenaMariposas.appendChild(mariposa);
}
const escenas = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('en-vista');
            escenas.unobserve(entrada.target);
        }
    });
}, {threshold: .25});
[document.querySelector('.cumple-animacion'), escenaMariposas].forEach(escena => escenas.observe(escena));
sobreCarta.addEventListener('click', () => sobreCarta.setAttribute('aria-expanded', 'true'));
sobreCarta.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') sobreCarta.setAttribute('aria-expanded', 'true');
});
const regalo = document.getElementById('abrirRegalo');
regalo.addEventListener('click', () => {
    if(regalo.classList.contains('abierto')) return;
    regalo.classList.add('abierto');
    regalo.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
        const final = document.getElementById('finalSorpresa');
        final.hidden = false;
        regalo.closest('.regalo-seccion').hidden = true;
        regalo.closest('.regalo-seccion').style.display = 'none';
        final.focus({preventScroll:true});
        final.scrollIntoView({behavior: movimientoReducido.matches ? 'instant' : 'smooth', block:'start'});
        if(!movimientoReducido.matches) for(let i=0;i<22;i++) setTimeout(crearCorazon,i*90);
    }, movimientoReducido.matches ? 0 : 650);
});
