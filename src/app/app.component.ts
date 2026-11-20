import { Component, OnInit } from '@angular/core';
import { IdiomaService } from './services/idioma.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private idioma: IdiomaService) {}

  ngOnInit() {
    if (!this.idioma.yaEligio()) {
      this.idioma.elegir(true);
    }
  }
}