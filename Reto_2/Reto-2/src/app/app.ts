import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


class Peleador {
  constructor(public nombre: string, public vida: number = 10) {}
  
  quitar(cantidad: number): void {
    this.vida -= cantidad;
    if (this.vida < 0) this.vida = 0;
  }
  
  golpear(objetivo: Peleador): void {
    objetivo.quitar(2);
  }
  
  vivo(): boolean {
    return this.vida > 0;
  }
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  j1: Peleador | null = null;
  j2: Peleador | null = null;
  
  nom1: string = 'P1';
  nom2: string = 'P2';
  
  juegoIniciado = false;
  turnoEnProceso = false;
  mensaje = '';
  ruleta = '';
  ganador = '';
  
  golpeJ1 = false;
  golpeJ2 = false;

  iniciarJuego(): void {
    this.j1 = new Peleador(this.nom1.trim() || 'P1');
    this.j2 = new Peleador(this.nom2.trim() || 'P2');
    this.juegoIniciado = true;
    this.mensaje = '¡Empieza!';
    this.ganador = '';
  }

  hacerTurno(): void {
    if (!this.j1 || !this.j2 || !this.j1.vivo() || !this.j2.vivo()) {
      if (this.j1 && this.j2) {
        this.ganador = `${this.j1.vivo() ? this.j1.nombre : this.j2.nombre} gana 🎉`;
      }
      return;
    }

    const atacante = Math.random() < 0.5 ? this.j1 : this.j2;
    const defensor = atacante === this.j1 ? this.j2 : this.j1;
    
    this.turnoEnProceso = true;
    this.mensaje = 'Girando...';

    let pasos = 0;
    const giro = setInterval(() => {
      this.ruleta = pasos % 2 === 0 ? this.j1!.nombre : this.j2!.nombre;
      pasos++;
      
      if (pasos > 6) {
        clearInterval(giro);
        this.ruleta = atacante.nombre;
        
        if (atacante === this.j1) {
          this.golpeJ1 = true;
          setTimeout(() => this.golpeJ1 = false, 300);
        } else {
          this.golpeJ2 = true;
          setTimeout(() => this.golpeJ2 = false, 300);
        }
        
        atacante.golpear(defensor);
        
        if (!defensor.vivo()) {
          this.mensaje = `${atacante.nombre} gana 🎉`;
          this.ganador = atacante.nombre;
        } else {
          this.mensaje = `${atacante.nombre} golpeó a ${defensor.nombre} (-2)`;
        }
        
        this.turnoEnProceso = false;
      }
    }, 150);
  }

  reiniciarJuego(): void {
    this.j1 = null;
    this.j2 = null;
    this.juegoIniciado = false;
    this.turnoEnProceso = false;
    this.mensaje = '';
    this.ruleta = '';
    this.ganador = '';
    this.golpeJ1 = false;
    this.golpeJ2 = false;
  }
}
