import { ChangeDetectorRef, Component } from '@angular/core';
import { RadioGroupCustomEvent } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle, sparkles } from 'ionicons/icons';
import {
  CATEGORIAS,
  Categoria,
  DIFICULTADES,
  DIFICULTADES_LISTA,
  Dificultad,
  PREGUNTAS_POR_RONDA,
  Pregunta,
} from '../models/trivia.model';
import { FichasService } from '../services/fichas.service';
import { TriviaService } from '../services/trivia.service';

type Estado = 'inicio' | 'ruleta' | 'pregunta' | 'resultado';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  estado: Estado = 'inicio';
  dificultades = DIFICULTADES_LISTA;
  categorias = CATEGORIAS;
  dificultad: Dificultad = 'facil';
  totalPreguntas = PREGUNTAS_POR_RONDA;

  numero = 0;   // número de la pregunta actual (1 a 10)
  aciertos = 0;
  fichas = 0;
  ganadas = 0;

  // Ruleta
  rotacion = 0;
  girando = false;
  categoria?: Categoria;

  // Pregunta actual
  pregunta?: Pregunta;
  elegida: number | null = null;

  cargando = false;
  error = false;

  constructor(
    private trivia: TriviaService,
    private fichasService: FichasService,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ checkmarkCircle, closeCircle, sparkles });
  }

  ionViewWillEnter() {
    this.fichas = this.fichasService.cantidad();
    this.cdr.markForCheck();
  }

  get recompensaActual(): number {
    return DIFICULTADES[this.dificultad].recompensa;
  }

  cambiarDificultad(ev: RadioGroupCustomEvent) {
    this.dificultad = ev.detail.value;
  }

  comenzar() {
    this.cargando = true;
    this.error = false;

    this.trivia.preparar().subscribe({
      next: () => {
        this.numero = 1;
        this.aciertos = 0;
        this.cargando = false;
        this.irARuleta();
      },
      error: () => {
        this.cargando = false;
        this.error = true;
        this.cdr.markForCheck();
      },
    });
  }

  // Ángulo del centro de cada sector de la ruleta
  angulo(indice: number): number {
    const sector = 360 / this.categorias.length;
    return indice * sector + sector / 2;
  }

  girar() {
    if (this.girando) return;
    this.girando = true;

    const categoria = this.trivia.categoriaAlAzar();
    const destino = (360 - this.angulo(this.categorias.indexOf(categoria))) % 360;
    const actual = this.rotacion % 360;
    // 3 vueltas completas + lo que falta para que la categoría quede bajo la flecha
    this.rotacion += 3 * 360 + ((destino - actual + 360) % 360);

    // Espera a que termine la animación CSS (1,2 s)
    setTimeout(() => {
      this.girando = false;
      this.categoria = categoria;
      this.cargarPregunta();
    }, 1300);
  }

  cargarPregunta() {
    if (!this.categoria) return;
    this.cargando = true;
    this.error = false;
    this.elegida = null;
    this.cdr.markForCheck();

    this.trivia.generar(this.categoria, this.dificultad).subscribe({
      next: (pregunta) => {
        this.pregunta = pregunta;
        this.cargando = false;
        this.estado = 'pregunta';
        this.cdr.markForCheck();
      },
      error: () => {
        this.cargando = false;
        this.error = true;
        this.cdr.markForCheck();
      },
    });
  }

  responder(indice: number) {
    if (this.elegida !== null || !this.pregunta) return;
    this.elegida = indice;
    if (indice === this.pregunta.correcta) {
      this.aciertos++;
    }
  }

  colorOpcion(indice: number): string {
    if (this.elegida === null || !this.pregunta) return 'medium';
    if (indice === this.pregunta.correcta) return 'success';
    if (indice === this.elegida) return 'danger';
    return 'medium';
  }

  siguiente() {
    if (this.numero >= this.totalPreguntas) {
      this.terminar();
      return;
    }
    this.numero++;
    this.irARuleta();
  }

  volverAlInicio() {
    this.estado = 'inicio';
    this.cargando = false;
    this.error = false;
    this.fichas = this.fichasService.cantidad();
    this.cdr.markForCheck();
  }

  private irARuleta() {
    this.estado = 'ruleta';
    this.pregunta = undefined;
    this.categoria = undefined;
    this.cdr.markForCheck();
  }

  private terminar() {
    this.ganadas = this.trivia.recompensa(this.dificultad, this.aciertos);
    if (this.ganadas > 0) {
      this.fichasService.sumar(this.ganadas);
    }
    this.fichas = this.fichasService.cantidad();
    this.estado = 'resultado';
    this.cdr.markForCheck();
  }
}