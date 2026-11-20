import { Pipe, PipeTransform } from '@angular/core';
import { IdiomaService } from '../services/idioma.service';

@Pipe({
  name: 't',
  pure: false,
})
export class TraducirPipe implements PipeTransform {
  constructor(private idioma: IdiomaService) {}

  transform(clave: string): string {
    return this.idioma.t(clave);
  }
}