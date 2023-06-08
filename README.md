# Energy Dashboard Web

This project contains the source code of the Angular frontend of [Energie-Dashboard Schweiz](https://energiedashboard.admin.ch).

## Initial Setup with Yarn

In order to develop and deploy new functions you need to have NodeJS and Yarn installed.
Install it as described on https://yarnpkg.com/getting-started/install

Run `yarn` to fetch all needed packages.

Basic usage Cheatsheet: https://www.digitalocean.com/community/tutorials/nodejs-npm-yarn-cheatsheet

## Run locally

-   `yarn start` --> [http://localhost:4200](http://localhost:4200)

### Server Side Rendering

The application that is deployed on AWS uses Server Side rendering to improve performance and SEO. Rendered pages are cached by a CDN. SSR happens inside an AWS Lambda function that starts an express server that then runs Server Side Rendering from Angular Universal. The application is currently not optimized such that it would also fetch data in SSR.

-   `yarn start:ssr` --> [http://localhost:4000](http://localhost:4000) with Server Side Rendering from Angular Universal
-   `yarn dev:sls` --> [http://localhost:3000](http://localhost:3000) with local serverless, emulating AWS Lambda function

The following files are responsible for Server Side rendering:

-   `lambda.js` Contains the actual lambda function running on AWS
-   `serverless.ts` Contains the express server rendering the application
-   `src/main.server.ts` Contains the Angular Universal runtime exposed in the express server
-   `src/app/app.server.module.ts` Exposes the Angular App Module (and thus its main entrypoint) as a server module as opposed to a regular runtime module
-   `tsconfig.serverless.json` Contains the typescript config for SSR
-   `angular.json` Contains environment and build configuration for SSR (as well as regular rendering)

## Build & Deployment

The application is built and packaged by yarn and serverless and then deployed by serverless.
You can trigger a build of the serverless application with the command `yarn build:sls`.

### Serverless

For managing deployment of the application, the SSR lambda functions and all other necessary resources in AWS and to package and deploy everything we use the framework Serverless. The configuration is stored in `serverless.yml`

### Manual and automatic Deployments

Deployment currently happens on Gitlab @ti8m but can also be triggered manually. Currently, the following yarn commands are configured in ti8m's Gitlab-Instance:

-   `yarn build:sls && yarn deploy`: Deploys all functions to the DEV-Stage; Gets triggered on new commits to the `master` branch in Gitlab
-   `yarn build-prod:sls && yarn deploy-prod`: Deploys all functions to the PROD-Stage; Gets triggered on new commits to the `production` branch in Gitlab

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Linting and Formatting

We're using ESLint and Prettier for automatic Linting and Formatting of the code. Linting and Formatting are included as a pre-commit hook with Husky so that they're always executed. You need to run `yarn prepare` once initially to set husky up.

### IntelliJ

In case IntelliJ is configured differently than Prettier it's possible that IntelliJ changes the formatting of files after the commit. To fix that you need to install the "prettier" plugin in IntelliJ and set Prettier as the default formatter. More information here: https://www.jetbrains.com/help/idea/prettier.html

Also, make sure to use the IntelliJ version 2022.2.2+, as there is a bug with ESLint and earlier versions of IntelliJ

## I18n - Internationalization

We use `i18next` and `angular-i18next` to fully internationalize the application. We currently support four languages (DE, FR, IT, EN) and have translations for all of those.

Due to project requirements we have a mix of static texts which are loaded at runtime from `src/app/core/i18n/translations` and dynamic texts which are loaded at runtime from a REST-API (`/api/dynamic-translations`). The dynamic texts can be updated by the BfE in the S3-Bucket and allow for a faster adaption to changed requirements of the texts.

Dynamic Texts are added into a separate Namespace of i18net called `dynamic` and can be referenced with this namespace (e.g. `dynamic:uebersicht-platzhalter.titel`). It's important to use the `i18nextDynamic` pipe with dynamic texts because the regular `i18next` pipe is pure and therefore might not show texts that haven't been loaded.

## Icons from Fontawesome Pro

We are using certain icons under the Fontawesome Pro license. In order to be allowed to install access them you need to have a valid key to the fortawesome npm registry and reference the key under the environment variable `FONTAWESOME_NPM_AUTH_TOKEN`. The token and fortawesome registry is configured in `.yarnrc.yml`

## Running unit tests

Run `yarn test` to execute the unit tests with Jest. All tests need to pass in order to complete the build pipeline.

## Running e2e tests
We use cypress for E2E testing. Run `yarn e2e:open` to open the Cypress Launchpad (GUI) and to run the tests. (Run the command in the root path where the cypress folder and cypress.config.ts are listed or the tests won't be found.) (see https://docs.cypress.io/guides/getting-started/opening-the-app for more information about Cypress)

Run `yarn e2e` to start the cypress tests in headless mode (without GUI) and show the test results in the terminal. In cypress.config.ts we configured video-recordings to be off, change this if you need these. Videos and Screenshots from the latest run will be saved under videos and/or screenshots. 

### skipped vs. pending tests
Due to Cypress using Mocha dependencies the tests that are being skipped (it.skip, describe.skip, context.skip) are being shown as `pending`. The terminology of cypress understands that `pending` are tests not executed. The tests that are shown under `skipped` are those that were planned to run but were not because, for example, a beforeEach hook failed. https://github.com/cypress-io/cypress-skip-test

## Troubleshooting

If `yarn install` is throwing an error concerning `FONTAWESOME_NPM_AUTH_TOKEN`, install direnv (https://direnv.net/#basic-installation / on Mac with brew) and create a .envrc-file with `export FONTAWESOME_NPM_AUTH_TOKEN=XXX` (check out confluence page for token). Then allow the current folder with `dotenv allow .` to make it work.
