import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';
(async () => {
  const app = await createApplication(appConfig);
  const appElement =
    createCustomElement(
      AppComponent,
      { injector: app.injector }
    );
  if (!customElements.get('asset-widget')) {
    customElements.define(
      'asset-widget',
      appElement
    );
  }
})();