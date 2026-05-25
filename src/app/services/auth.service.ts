import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';

import { HttpClient }
from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiUrl}/api/Auth/login`;

  constructor(
    private http: HttpClient
  ) { }

  login(
    usuario:string,
    password:string
  ) {

    return this.http.post<any>(
      this.url,
      {
        usuario,
        password
      });

  }

  logout() {

    localStorage.removeItem('token');

  }

}