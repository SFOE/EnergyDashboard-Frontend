import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:4200',
        video: false, // get video recordings of tests stored under videos
        excludeSpecPattern: '**/examples-to-delete/**',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        }
    }
});
