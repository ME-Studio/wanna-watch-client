import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataStoreService } from '../services/data-store.service';
import * as _ from 'lodash'
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lodash = _


  dataFetched: boolean = false
  allMovies: {}[] = []
  allShows: {}[] = []
  watchlist: any

  constructor(
    private __apiService: ApiService,
    private __dataStoreService: DataStoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMoviesAndShows()
    this.getwatchlist()
  }

  async getMoviesAndShows(){
    this.__dataStoreService.allMovies = await this.__apiService.get('movie')
    this.__dataStoreService.allShows = await this.__apiService.get('show')
    this.allMovies  = this.__dataStoreService.allMovies
    this.allShows = this.__dataStoreService.allShows
    this.dataFetched = true
  }

  async getwatchlist(){
    this.watchlist = await this.__apiService.watchlist()
    this.__dataStoreService.watchlist = this.watchlist
    console.log('watchlist', this.__dataStoreService.watchlist)
  }

  async addToWatchlist(event: Event, type: String, data: any) {
    event.stopPropagation();
    let body = {  }
    body[`${type}_id`] = data.id
    body['watched'] = false

    if(type === 'movie'){
      const isWatched = _.find(this.watchlist.movies, data)
      body['watched'] = isWatched && isWatched.pivot ? isWatched.pivot.watched : false
      if(!isWatched){
        this.__dataStoreService.watchlist.movies.push(data)
      } 
    }else if(type === 'show'){
      const isWatched = _.find(this.watchlist.shows_watched, { show_id: data.id, season_id: null, episode_id: null })
      body['watched'] = isWatched ? isWatched.watched : false
      if(!isWatched){
        this.__dataStoreService.watchlist.shows.push(data)
      }
    }

    const result = await this.__apiService.add(type, body)

    console.log('Result from addTowatchList', result)
  }

  expand(type: String, data: {id: Number}){

    if(type === 'movie'){
      const MovieWatchedData = _.find(this.__dataStoreService.watchlist.movies, data)
      data = MovieWatchedData ? MovieWatchedData : data
    }

    this.__dataStoreService[`highlighted${_.upperFirst(type)}`] = data
    this.router.navigate([type, data.id])
  }

}
