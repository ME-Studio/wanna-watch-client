export const environment = {
  production: true,
  api_store: {
    domain: 'https://56981fb1cc63.ngrok.io/',
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
    }
  }
};
