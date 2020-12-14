import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  allMovies: {}[] = []
  allShows: {}[] = []
  highlightedMovie: any
  highlightedShow: any
  watchlist: any

  constructor() { }
}
