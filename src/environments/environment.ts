import { User } from 'app/core/models';
import { Observable } from 'apollo-link';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    users: User,


      apiUrl: 'https://api.galdierirents.info'

       // apiUrl: 'http://localhost:3333'
     // apiUrl: 'http://localhost:4106'
};

// export let storageUser: User = { username: 'init' };
// export let ob: Observable<User>;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.