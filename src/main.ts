import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import Quill from 'quill';
import './app/quill-blots/button-blot';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


// Quill.register(ButtonBlot);