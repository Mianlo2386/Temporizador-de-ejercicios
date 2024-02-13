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

    document.querySelector('.leyenda').classList.add('oculto');
    document.getElementById('temporizador').classList.remove('oculto');

    temporizadorDiv.textContent = 'GO!';

    let segundosTotales = enDescanso ? tiempoDescanso : tiempoTrabajo;

    temporizador = setInterval(() => {
        const minutos = Math.floor(segundosTotales / 60);
        const segundos = segundosTotales % 60;
        const tiempoRestante = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

        if (segundosTotales === 0) {
            if (!enDescanso) {
                if (seriesRestantes === 1) {
                    clearInterval(temporizador);
                    temporizadorDiv.textContent = '¡Terminado!';
                    return;
                }
                temporizadorDiv.textContent = 'Descanso';
                enDescanso = true;
                segundosTotales = tiempoDescanso;
            } else {
                seriesRestantes--;
                temporizadorDiv.textContent = 'GO!';
                enDescanso = false;
                segundosTotales = tiempoTrabajo;
            }
        } else {
            temporizadorDiv.textContent = tiempoRestante;
            segundosTotales--;
        }
        
        
    }, 1000);
}



iniciarButton.addEventListener('click', iniciarTemporizador);
pausarButton.addEventListener('click', () => clearInterval(temporizador));
