import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {

  timeout: any;

  constructor(private router: Router) {
    this.startTimer();

    window.onmousemove = () => this.resetTimer();
    window.onkeydown = () => this.resetTimer();
    window.onclick = () => this.resetTimer();
  }

  startTimer() {

    this.timeout = setTimeout(() => {

      localStorage.removeItem('token');

      this.router.navigate(['/login']);

      alert('Sesión finalizada por inactividad');

    }, 15 * 60 * 1000);
  }

  resetTimer() {

    clearTimeout(this.timeout);

    this.startTimer();
  }
}