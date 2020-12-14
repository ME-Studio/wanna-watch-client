import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataStoreService } from '../services/data-store.service';
import * as _ from 'lodash' 
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  lodash = _
  watchlist: any
  dataFetched: Boolean = false
  
  constructor(
    private __dataStoreService: DataStoreService,
    private __apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getwatchlist()
  }

  async getwatchlist(){
    this.__dataStoreService.watchlist = await this.__apiService.watchlist()
    this.watchlist  = this.__dataStoreService.watchlist
    this.dataFetched = true

    console.log('this.watchlist', this.watchlist)
  }

  expand(type: String, data: {id: Number}){
    this.__dataStoreService[`highlighted${_.upperFirst(type)}`] = data
    this.router.navigate([type, data.id])
  }

}
