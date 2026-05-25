import { Routes } from '@angular/router';
import { ValoresComponent } from './pages/valores/valores.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard }
from './guards/auth.guard';

export const routes: Routes = [
    {
    path:'login',
    component: LoginComponent
  },
    {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ValoresComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
