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
  watchlist: any = this.__dataStoreService.watchlist
  
  constructor(
    private __dataStoreService: DataStoreService,
    private __apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  expand(type: String, data: {id: Number}){
    this.__dataStoreService[`highlighted${_.upperFirst(type)}`] = data
    this.router.navigate([type, data.id])
  }

}
