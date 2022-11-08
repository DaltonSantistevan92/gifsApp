import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  //buscar
  //mejor opcion decorador  @ViewChild 
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  // event:KeyboardEvent otra opcion por parametro (otra opcion)
  buscar(){
    const valor = this.txtBuscar.nativeElement.value;

     if(valor.trim().length === 0){ return; } //no ingrese valor vacios
 
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }

}
