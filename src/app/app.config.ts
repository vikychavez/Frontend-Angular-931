import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient ,
        withInterceptors
} from '@angular/common/http';
import {
  authInterceptor
}
from './interceptors/auth.interceptor';
import { LOCALE_ID } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(  withInterceptors([
    authInterceptor
  ])),
  {
  provide: LOCALE_ID,
  useValue: 'es-AR'
  }
  ]
};
