import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = '5AdhyaYTH90iqE3Zz4pJfkgchXhIn2No';

  private urlGifs =  environment.urlGifs;

  private limite:string = '10';

  private _historial: string [] = [];

  // TODO  Cambiar any por su tipo
  public resultados: Gif [] = [];

  constructor( private http: HttpClient) { 

    // if (localStorage.getItem('historial')) {//otra forma
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );   
    // }

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];//mejor forma

    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];//mejor forma

  }

  
  get historial() {
    return [...this._historial];
  }

  buscarGifs (query:string = ''){

    query = query.trim().toLocaleLowerCase();  //trim borrar espacio .toLocaleLowerCase para minuscula
      
    if(!this._historial.includes(query)){ //si no lo incluye
      this._historial.unshift(query)  //inserta al inicio
      this._historial = this.historial.splice(0,10);  //limite recortado hasta 10
      
      localStorage.setItem('historial', JSON.stringify(this._historial));
    } 
    // console.log(this._historial); 
    
    const params = new HttpParams().set('api_key', this.apiKey).set('limit', this.limite).set('q', query);

    this.http.get<SearchGifsResponse>(`${this.urlGifs}/search`, { params })
    .subscribe( (res) => {
      //console.log(res.data);
      this.resultados = res.data;

      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
  }


  
}
