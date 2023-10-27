import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import 'zone.js';
import { AppServerModule } from './src/main.server';
// The Express app is exported so that it can be used by serverless Functions.
export const server = express();
const distFolder = join(process.cwd(), 'dist/energy-dashboard-web/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';
// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
server.engine(
    'html',
    ngExpressEngine({
        bootstrap: AppServerModule
    })
);
server.set('view engine', 'html');
server.set('views', distFolder);
// Example Express Rest API endpoints
// server.get('/api/**', (req, res) => { });
// Serve static files from /browser
server.get(
    '*.*',
    express.static(distFolder, {
        maxAge: '1y'
    })
);
// All regular routes use the Universal engine
server.get('*', (req, res) => {
    res.render(indexHtml, {
        req,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
    });
});
export * from './src/main.server';
