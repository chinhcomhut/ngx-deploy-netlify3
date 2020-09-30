// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_local: 'http://localhost:8080/api/auth/',
  URL_server: 'https://backend-lamlai.herokuapp.com/api/auth/',
  firebaseConfig: {
    apiKey: "AIzaSyAWOQtlp-1qK-jUP2IKsT6Jed448nWs-zc",
    authDomain: "minhtri-32a25.firebaseapp.com",
    databaseURL: "https://minhtri-32a25.firebaseio.com",
    projectId: "minhtri-32a25",
    storageBucket: "minhtri-32a25.appspot.com",
    messagingSenderId: "394481186285",
    appId: "1:394481186285:web:79862a713045cf6e15a3e4",
    measurementId: "G-1LZ623LZ1W"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
