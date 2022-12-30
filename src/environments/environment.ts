// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  test: false,
  envName: 'dev',
  version: '0.0.1',
  firebaseConfig: {
    apiKey: 'AIzaSyB0W6WKbzsNbpZFgoF8wpAq-GyjrekhT-I',
    authDomain: 'mue-budget-dev.firebaseapp.com',
    databaseURL: 'https://mue-budget-dev.firebaseio.com',
    projectId: "mue-budget-dev",
    storageBucket: "mue-budget-dev.appspot.com",
    messagingSenderId: "647383931297"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
