import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  registerLocaleData(localeEsAr);
