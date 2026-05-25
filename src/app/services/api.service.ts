import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Valores } from '../models/valores';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   /*private url = 'https://localhost:7158/api/_931';*/
   private url = `${environment.apiUrl}/api/_931`;
   

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Valores[]> {
    return this.http.get<Valores[]>(this.url);
  }
  agregar(valor: Valores) {
    return this.http.post(this.url, valor);
  }

  actualizar(valor: Valores) {
    return this.http.put(this.url, valor);
  }

  eliminar(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
