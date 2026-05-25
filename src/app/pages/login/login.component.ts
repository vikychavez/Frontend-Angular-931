import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  usuario:string = '';

  password:string = '';

  constructor(
    private auth:AuthService,
    private router:Router
  ) {}

  login() {

    this.auth.login(
      this.usuario,
      this.password
    ).subscribe({

     next: r => {

  console.log("RESPUESTA LOGIN", r);

  if (typeof window !== 'undefined') {

    console.log("GUARDANDO TOKEN");

    localStorage.setItem(
      'token',
      r.token
    );

    console.log(
      "TOKEN GUARDADO:",
      localStorage.getItem('token')
    );
  }

  this.router.navigate(['/']);

},

      error: () => {

        alert('Usuario o password incorrecto');

      }

    });

  }
  logout() {

  this.auth.logout();

  this.router.navigate(['/login']);

}

}