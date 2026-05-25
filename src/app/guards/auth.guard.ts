import { CanActivateFn } from '@angular/router';
import { Router,UrlTree } from '@angular/router';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }

  return true;
};

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;

    if (!exp) return true;

    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}