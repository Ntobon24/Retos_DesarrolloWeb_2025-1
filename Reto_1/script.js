class Peleador {
  constructor(nombre, vida = 10) {
    this.nombre = nombre;
    this.vida = vida;
  }
  quitar(cantidad) {
    this.vida -= cantidad;
    if (this.vida < 0) this.vida = 0;
  }
  golpear(objetivo) {
    objetivo.quitar(2);
  }
  vivo() {
    return this.vida > 0;
  }
}

const nom1 = document.getElementById("nom1");
const nom2 = document.getElementById("nom2");
const btnInicio = document.getElementById("btnInicio");
const campo = document.querySelector(".campo");
const lbl1 = document.getElementById("lbl1");
const lbl2 = document.getElementById("lbl2");
const vida1 = document.getElementById("vida1");
const vida2 = document.getElementById("vida2");
const info = document.getElementById("info");
const ruleta = document.getElementById("ruleta");
const btnTurno = document.getElementById("btnTurno");
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");

let j1, j2;

function verVidas() {
  vida1.textContent = `Vida: ${j1.vida}`;
  vida2.textContent = `Vida: ${j2.vida}`;
}

function animGolpe(div) {
  div.classList.add("golpe");
  setTimeout(() => div.classList.remove("golpe"), 300);
}

function hacerTurno() {
  if (!j1.vivo() || !j2.vivo()) {
    info.textContent = `${j1.vivo() ? j1.nombre : j2.nombre} gana 🎉`;
    btnTurno.disabled = true;
    return;
  }

  const atacante = Math.random() < 0.5 ? j1 : j2;
  const defensor = atacante === j1 ? j2 : j1;
  const divAtacante = atacante === j1 ? box1 : box2;

  btnTurno.disabled = true;
  info.textContent = "Girando...";

  let pasos = 0;
  const giro = setInterval(() => {
    ruleta.textContent = pasos % 2 === 0 ? j1.nombre : j2.nombre;
    pasos++;
    if (pasos > 6) {
      // pocas vueltas
      clearInterval(giro);
      ruleta.textContent = atacante.nombre;
      animGolpe(divAtacante);
      atacante.golpear(defensor);
      verVidas();

      if (!defensor.vivo()) {
        info.textContent = `${atacante.nombre} gana 🎉`;
      } else {
        info.textContent = `${atacante.nombre} golpeó a ${defensor.nombre} (-2)`;
        btnTurno.disabled = false;
      }
    }
  }, 150);
}

btnInicio.addEventListener("click", () => {
  j1 = new Peleador(nom1.value.trim() || "P1");
  j2 = new Peleador(nom2.value.trim() || "P2");
  lbl1.textContent = j1.nombre;
  lbl2.textContent = j2.nombre;
  campo.style.display = "flex";
  btnInicio.style.display = "none";
  nom1.style.display = "none";
  nom2.style.display = "none";
  btnTurno.style.display = "inline-block";
  info.textContent = "¡Empieza!";
  verVidas();
});

btnTurno.addEventListener("click", hacerTurno);
