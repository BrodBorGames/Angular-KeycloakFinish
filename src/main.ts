import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import './app/interceptors/request.interceptor'

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
