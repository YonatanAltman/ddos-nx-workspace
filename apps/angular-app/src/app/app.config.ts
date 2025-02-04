import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { provideHttpClient } from '@angular/common/http';

ModuleRegistry.registerModules([AllCommunityModule]);
import { themeBalham } from 'ag-grid-community';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient()
  ],
};
