import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataStoreService } from '../services/data-store.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  lodash = _
  movieData: any = this.__dataStoreService.highlightedMovie
  watchlist: any  = this.__dataStoreService.watchlist

  get inWatchlist(): any {
    const result = _.find(this.watchlist.movies, this.movieData)
    return result ? result : false
  }
  
  constructor(
    private __dataStoreService: DataStoreService,
    private __apiService: ApiService
  ) {
    
  }

  ngOnInit(): void {
    this.__dataStoreService.highlightedMovie = this.inWatchlist ? this.inWatchlist : this.__dataStoreService.highlightedMovie 
    if(!this.__dataStoreService.highlightedMovie.pivot)
        this.__dataStoreService.highlightedMovie.pivot = { watched: false }
    this.movieData = this.__dataStoreService.highlightedMovie
  }

  async addToWatchlist(movieData: any) {
    let body = { movie_id: movieData.id  }

    const isWatched = _.find(this.watchlist.movies, movieData)
    body['watched'] = isWatched && isWatched.pivot ? isWatched.pivot.watched : false
    if(!isWatched){
      this.__dataStoreService.watchlist.movies.push(movieData)
    } 

    const result = await this.__apiService.add('movie', body)

    console.log('Result from addTowatchList', result)
  }


  async changeWatchedStatus(movie_id: Number, watched: Boolean){
    const result = await this.__apiService.change('movie', { movie_id, watched  })
    this.__dataStoreService.highlightedMovie.pivot.watched = watched
    console.log(this.__dataStoreService.highlightedMovie.pivot)
  }

}
