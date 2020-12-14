import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {


  showData: any = this.__dataStoreService.highlightedShow

  constructor(
    private __dataStoreService: DataStoreService,
    private __apiService: ApiService
  ) { }

  ngOnInit(): void {
    console.log(this.showData)
  }

  async addToWatchlist(
    show_id: Number, 
    season_id: Number = null, 
    episode_id: Number = null
  ) {
    let body = { show_id, season_id, episode_id, watched: false }

    const result = await this.__apiService.add('show', body)

    console.log('Result from addTowatchList', result)
  }

}
