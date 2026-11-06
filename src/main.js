import './style.css'
import { resultados } from "./datos.js";

const formulario = document.getElementById("formulario");
const apuestaInput = document.getElementById("apuesta");
const mensaje = document.getElementById("mensaje");
const numeroResultado = document.getElementById("numero-resultado");
const ruleta = document.getElementById("ruleta");
const boton = document.getElementById("boton");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const apuesta = apuestaInput.value.trim().toLowerCase();
    const colores = ["rojo", "negro"];

    if (apuesta == "") {
        mensaje.textContent = "Por favor, introduce tu apuesta.";
        numeroResultado.textContent = "?";
        numeroResultado.className = "";
    } else if (apuesta == "666") {
        mensaje.textContent = "¡Has invocado el número del diablo!";
        numeroResultado.textContent = "666";
        numeroResultado.className = "";
    } else if (colores.includes(apuesta)) {
        iniciarRuleta(apuesta, "color");
    } else if (!Number.isInteger(Number(apuesta)) || Number(apuesta) < 0 || Number(apuesta) > 36) {
        mensaje.textContent = "Introduce un número del 0 al 36 o un color (Rojo o Negro).";
        numeroResultado.textContent = "?";
        numeroResultado.className = "";
    } else {
        iniciarRuleta(Number(apuesta), "numero");
    }
});

function iniciarRuleta(miApuesta, tipoApuesta) {
    const indiceAleatorio = Math.floor(Math.random() * resultados.length);
    const resultado = resultados[indiceAleatorio];

    ruleta.classList.remove("girando");
    void ruleta.offsetWidth;
    ruleta.classList.add("girando");

    boton.disabled = true;

    mensaje.textContent = "La ruleta está girando...";
    numeroResultado.textContent = "?";
    numeroResultado.className = "";

    setTimeout(() => {
        numeroResultado.textContent = resultado.numero;
        numeroResultado.classList.add(resultado.color);

        let ganado = false;

        if (tipoApuesta == "numero") {
            ganado = miApuesta == resultado.numero;
        } else if (tipoApuesta == "color") {
            ganado = miApuesta == resultado.color;
        }

        if (ganado) {
            mensaje.textContent = "¡¡¡HAS GANADO!!! ¡ENHORABUENA!";
        } else {
            mensaje.textContent = `¡Has perdido! Salió el ${resultado.color} ${resultado.numero}.`;
        }

        boton.disabled = false;
    }, 3000);
}