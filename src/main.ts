import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppTwoComponent} from './app-two/app-two.component'
import { AppModule } from './app/app.module';
import { AppModule2 } from './app/app.module2';
import { environment } from './environments/environment';
import {ListUsersService} from './app/list-users.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

