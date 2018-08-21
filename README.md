# AngularfireDemo

##### By: Ryan Jones
##### Date: 08/17/2018

## Completed Project

https://angular-firebase-213402.firebaseapp.com/

## Install Instructions

### (Optional) Download VSCode

Here is a link, [VSCode](https://code.visualstudio.com/).

### Open a terminal

Open **VSCode** hit `CTRL + Option + T` (View -> Integrated Terminal) or open any terminal. We need to install some dependenceies.

#### Install Node/Npm

```bash
brew install node
node -v
npm -v
```

#### Install Angular CLI

```bash
npm install -g @angular/cli@latest
```

#### Clone Project

```bash
git clone https://github.com/Znergy/angularfire-frontend-demo
cd angularfire-frontend-demo
```

#### Install Dependencies

```bash
npm install
```

#### Open the project in a text editor

If you're using VSCode you can either click `Add Folder` or type `code .` in the Integrated Terminal which will open the current directory in VSCode. We will be modifying files shortly.

```bash
code .  # command to open current directory in VSCode
```

### Create a Firebase Project

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project called, `angularfirebase-demo`
- Hit `Create`

### Fill Firestore with some data

- Inside the project, open the side menu and click `Develop` then `Database`
- Click `Add Collection` and give it a **Collection ID** of `articles`
- For Document ID type `wildfires-in-california`.
- Add a field, `title` with type of `string` and value of `Wild Fires in California`
- Add another field, `img` with type of `string` and value of `http://www.latimes.com/resizer/0vPTX1doF3_l9lr1TuQv4wJeC4s=/1400x0/www.trbimg.com/img-5b7247bc/turbine/la-1534216120-4tlx3fqxus-snap-image`
- Click `Save` and now repeat the above creating additional `documents` as much as you want

### Copy your Firebase Project Credentials file

- Go to `Project Overview` in the Firebase Console (https://console.firebase.google.com/)
- Click the `</>` symbol shown under `Get started by adding Firebase to your app`
- Copy **only** the `config` object

### Change Environment.ts file in the Angular project

Open `/src/environments/environment.ts` and copy the `config` object under `production: false`.

```ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBND0Cf_tnsCSMzxxxxxxxxxx",
    authDomain: "xxxxx-xxxx-xxxx.firebaseapp.com",
    databaseURL: "https://xxx-xxx-xxx.firebaseio.com",
    projectId: "xxxxx-xx-xxx",
    storageBucket: "xxx-xxx-xxx.appspot.com",
    messagingSenderId: "xxxxxxxxx"
  }
};
```

Your app should now be ready to start making requests to Firebase from Angular.

### Serve Project Locally

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

```bash
ng serve --open
```

## Deploy to Firebase Hosting

Great article/video here, [AngularFirebase - Deploying an Angular App to Firebase](https://angularfirebase.com/lessons/deploying-an-angular-app-to-firebase/).

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Angular CLI Documentation

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
