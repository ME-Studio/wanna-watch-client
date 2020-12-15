// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_store: {
    domain: 'http://127.0.0.1:3333/',
    api_version: 'api/v1/',
    get signup() {
      return this.domain + this.api_version + 'users';
    },
    get login() {
      return this.domain + this.api_version + 'session';
    },
    get watchlist() {
      return this.domain + this.api_version + 'watchlist';
    },
    get logout() {
      return this.domain + this.api_version + 'session';
    },
    get addMovie() {
      return this.domain + this.api_version + 'movie';
    },
    get addShow() {
      return this.domain + this.api_version + 'show';
    },
    get getMovie() {
      return this.domain + this.api_version + 'movie';
    },
    get getShow() {
      return this.domain + this.api_version + 'show';
    },
    get changeMovie() {
      return this.domain + this.api_version + 'movie';
    },
    get changeShow() {
      return this.domain + this.api_version + 'show';
    }
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
