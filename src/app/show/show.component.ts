import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataStoreService } from '../services/data-store.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  lodash = _
  showData: any = this.__dataStoreService.highlightedShow
  watchlist: any  = this.__dataStoreService.watchlist

  get inWatchlist(): any {
    const result = _.find(this.watchlist.shows, this.showData) 
    return result ? result : false
  }

  constructor(
    private __dataStoreService: DataStoreService,
    private __apiService: ApiService
  ) {
   }

  ngOnInit(): void {
    this.__dataStoreService.highlightedShow = this.inWatchlist ? this.inWatchlist : this.__dataStoreService.highlightedShow
    if(!this.__dataStoreService.highlightedShow.pivot)
        this.__dataStoreService.highlightedShow.pivot = { watched: false }
    this.showData = this.__dataStoreService.highlightedShow
  }

  async addToWatchlist(showData: any) {

    let body = { show_id: showData.id }

    const isWatched = _.find(this.watchlist.shows_watched, { show_id: showData.id, season_id: null, episode_id: null })
    body['watched'] = isWatched ? isWatched.watched : false
    if(!isWatched){
      this.__dataStoreService.watchlist.shows.push(showData)
    } 

    const result = await this.__apiService.add('show', body)

    console.log('Result from addTowatchList', result)
  }

  async changeWatchedStatus(watched: Boolean, show_id: Number, season_id: Number = null, episode_id: Number = null){
    const result = await this.__apiService.change('show', { show_id, watched, season_id, episode_id })
      
    if(season_id && episode_id){
      watched 
        ? this.watchlist.shows_watched.push({ show_id, watched, season_id, episode_id }) 
        : this.watchlist.shows_watched = _.remove(this.watchlist.shows_watched, (n) => {
          return n.show_id !== show_id && n.watched !== !watched && n.season_id !== season_id && n.episode_id !== episode_id
        })
    }else {
      const result = await this.__apiService.change('show', { show_id, watched, season_id, episode_id })
      this.__dataStoreService.highlightedShow.pivot.watched = watched  
    }
  }

}
