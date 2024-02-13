// script.js

const seriesInput = document.getElementById('series');
const tiempoTrabajoInput = document.getElementById('tiempo-trabajo');
const tiempoDescansoInput = document.getElementById('tiempo-descanso');
const iniciarButton = document.getElementById('iniciar');
const pausarButton = document.getElementById('pausar');
const temporizadorDiv = document.getElementById('temporizador');

let tiempoActual = 0;
let temporizador;
let enDescanso = false;
let seriesRestantes = 0;

function iniciarTemporizador() {
    const series = parseInt(seriesInput.value);
    const tiempoTrabajo = parseInt(tiempoTrabajoInput.value);
    const tiempoDescanso = parseInt(tiempoDescansoInput.value);

    clearInterval(temporizador);
    enDescanso = false;
    seriesRestantes = series;

    temporizadorDiv.textContent = 'GO!';

    tiempoActual = tiempoTrabajo;

    temporizador = setInterval(() => {
        if (tiempoActual === 0) {
            if (!enDescanso) {
                if (seriesRestantes === 1) {
                    clearInterval(temporizador);
                    temporizadorDiv.textContent = '¡Terminado!';
                    return;
                }
                temporizadorDiv.textContent = 'Descanso';
                enDescanso = true;
                tiempoActual = tiempoDescanso;
            } else {
                seriesRestantes--;
                temporizadorDiv.textContent = 'GO!';
                enDescanso = false;
                tiempoActual = tiempoTrabajo;
            }
        } else {
            temporizadorDiv.textContent = tiempoActual;
            tiempoActual--;
        }
    }, 1000);
}


iniciarButton.addEventListener('click', iniciarTemporizador);
pausarButton.addEventListener('click', () => clearInterval(temporizador));
