import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppBrowserModule } from './app/app.browser.module';
import { environment } from './environments/environment';
import { defineCustomElements } from 'snippet-highlight/dist/loader';

if (environment.production) {
    enableProdMode();
}

function bootstrap() {
    platformBrowserDynamic()
        .bootstrapModule(AppBrowserModule)
        .catch((err) => console.error(err));
}

if (document.readyState === 'complete') {
    bootstrap();
} else {
    document.addEventListener('DOMContentLoaded', bootstrap);
}

// Needed for snippet-highlights
defineCustomElements(window);
